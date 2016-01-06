function YouTubeClip() {
    var youtube_id = youtube_parser( document.getElementById("startURL").value );
    var startsec = document.getElementById("
}

// Function taken from the following stackoverflow comment
// http://stackoverflow.com/a/8260383/3161979
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}


