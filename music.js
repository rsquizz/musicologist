const musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  if (info && musicInfo.length !== 1) {
  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
  }
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}

$('#getPlaylistBtn').click(function (event) {
  // TODO: Display a list of music.
  // You may use anything from musicInfo.
  // Currently trying to display the most recent 5 songs based on a search term
  if (musicInfo[0]) {
  let searchLink = 'https://itunes.apple.com/search?term=' + musicInfo[0] + '&entity=song&limit=15'
  const playlist = $("#playlist")
  $.ajax({
    url: searchLink,
    type: "GET",
    datatype: 'json',
    success: function(jsonObj) {
      let obj = JSON.parse(jsonObj);
       for (let i = 0; i < obj["results"].length; i++) {
        let shortIndex = (obj["results"][i])
        let trackName = (shortIndex['trackName']);
        let artistName = (shortIndex['artistName']);
        let artistPage = (shortIndex ['artistViewUrl']);
        let trackViewUrl = (shortIndex['trackViewUrl']);
        let $playlistRowTrack =  $('<li class="list-group-item track col-sm-6">').html("<a href='" + trackViewUrl + "' target=_'blank'>" + trackName + "</a>");
        let $playlistRowArtist =  $('<li class="list-group-item artist col-sm-6">').html('By ' + "<a href ='" + artistPage + "' target=_'blank'>" + artistName + "</a>");
        playlist.append($playlistRowTrack);
        playlist.append($playlistRowArtist);
      }}
  })
  console.log('Testing Music Call');
  }
});

/*OKAY SO
iTunes store web search API
Pass in a URL
https://itunes.apple.com/search?term=ella+fitzgerald
(https://itunes.apple.com/search?parameterkeyvalue)
Returns JSON file with info

What do I want from the JSON?
To display the playlist:
Let's start with:
Artist & Title
JSON:
"artistName":"Name here"
"trackName":"Name here"
"trackViewUrl":"URL here" - takes you to the entry in the iTunes store

To make the playlist:
Use:
"artistName":"Name here"
"primaryGenreName":"Genre here"

Use this to search the iTunes database

Look up all albums for Jack Johnson:
https://itunes.apple.com/lookup?id=909253&entity=album
Look up multiple artists by their AMG artist IDs and get each artist’s top 5 albums:
https://itunes.apple.com/lookup?amgArtistId=468749,5723&entity=album&limit=5
Look up multiple artists by their AMG artist IDs and get each artist’s 5 most recent songs:
https://itunes.apple.com/lookup?amgArtistId=468749,5723&entity=song&limit=5&sort=recent

Process:
Find artist
entity=song
ArtistTerm=
limit=10
return most recent

Process 2
Find genre
entity=song
genreIndex=genre
limit=10
return most recent

*/