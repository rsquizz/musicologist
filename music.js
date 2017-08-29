const musicInfo = [];
const playlist = $("#playlist");

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  if (info && musicInfo.length < 10) {
  musicInfo.push(info);
  renderList();
  $('#musicField').eq(0).val('');
} else {
  alert("Sorry, but this app supports a maximum of ten search terms.")
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
  playlist.empty();
  let searchLinks = [];
  for (let i = 0; i < musicInfo.length; i++){
    let searchLink = 'https://itunes.apple.com/search?term=' + musicInfo[i] + '&entity=song&limit=2';
    searchLinks.push(searchLink);
  }
  for (let i = 0; i < searchLinks.length; i++) {
    $.ajax({
      url: searchLinks[i],
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
  }
    console.log('Testing Music Call');
    }
  );