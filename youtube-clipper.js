function YouTubeClip() {

  var finalURL = "http://youtube.com/v/";
  var youtube_id = youtube_parser(document.getElementById("startURL").value);
  var startsec = parseInt(document.getElementById("startsec").value);
  var startmin = parseInt(document.getElementById("startmin").value);
  var endsec = parseInt(document.getElementById("endsec").value);
  var endmin = parseInt(document.getElementById("endmin").value);
  var starttime = startmin * 60 + startsec;
  var endtime = endmin * 60 + endsec;
  var autoplay = document.getElementById("autoplay").checked;
  
  // condition0: URL has a valid YouTube video ID
  // condition1: startsec is valid second value
  // condition2: startmin is valid minute value
  // condition3: endsec is valid second value
  // condition4: endmin is valid minute value 
  // condition5: end time is greater than start time
  // condition6: URL is valid YouTube URL
  var condition0 = youtube_id;
  var condition1 = validator.isInt(String(startsec), {min: 0, max:59 });
  var condition2 = validator.isInt(String(startmin), {min: 0, max:59 });
  var condition3 = validator.isInt(String(endsec), {min: 0, max:59 });
  var condition4 = validator.isInt(String(endmin), {min: 0, max:59 });
  var condition5 = endtime > starttime;
  var condition6 = validator.isURL(document.getElementById("startURL").value, {
    protocols: ['http','https'], 
    host_whitelist: ["www.youtube.com", "youtube.com", "www.youtu.be", "youtu.be"]
  });

  // If valid YouTube URL (Valid URL, 
  // URL contains youtube host, and contains video ID), 
  // then proceed. Otherwise, error.
  //
  // If valid start time, 
  // append &start=starttime
  //
  // If valid start time and valid end time (greater than start time),
  // append &start=starttime&end=endtime
  //
  // If invalid start time and valid end time,
  // append &end=endtime
  //
  // Finally, if autoplay checkbox is checked append &autoplay=1, 
  // create and format embed code,
  // and display results on screen
  if (condition0 && condition6) {
    finalURL += youtube_id;
    if (condition1 && condition2) {
        finalURL += "&start=" + starttime;
        if (condition3 && condition4) {
            if (condition5) {
            endtime = endmin * 60 + endsec;
            finalURL += "&end=" + endtime;
            } else alert("End time not greater than start time!");
        } 
    } else if (condition3 && condition4) {
        finalURL += "&end=" + endtime;
    }
    if (autoplay) finalURL += "&autoplay=1";
    finalEmbed = "<iframe src=\"";
    finalEmbed += finalURL;
    finalEmbed += "\" frameborder=\"0\" allowfullscreen></iframe>"
    document.getElementById("newURL").value = finalURL;
    document.getElementById("newEmbed").value = finalEmbed;
  } else {
    alert("Invalid URL provided: YouTube Clipper only works with YouTube video URLs");
  }
}

// Function taken from the following stackoverflow comment
// http://stackoverflow.com/a/8260383/3161979
function youtube_parser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}
