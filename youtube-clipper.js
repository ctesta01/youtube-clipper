function YouTubeClip() {
  // Multiple condition testing style taken from the following stackoverflow comment
  // http://stackoverflow.com/a/19478159/3161979
  //
  // condition0: URL has a valid YouTube video ID
  // condition1: startsec is valid second value
  // condition2: startmin is valid minute value
  // condition3: endsec is valid second value
  // condition4: endmin is valid minute value 
  // condition5: end time is greater than start time
  // condition6: URL is valid YouTube URL
  var a = 0;
  var b = 0; 
  var youtube_id = youtube_parser(document.getElementById("startURL").value);
  var startsec = parseInt(document.getElementById("startsec").value);
  var startmin = parseInt(document.getElementById("startmin").value);
  var endsec = parseInt(document.getElementById("endsec").value);
  var endmin = parseInt(document.getElementById("endmin").value);
  var condition0 = youtube_id;
  var condition1 = validator.isInt(startsec, {min: 0, max:59 });
  var condition2 = validator.isInt(startmin, {min: 0, max:59 });
  var condition3 = validator.isInt(endsec, {min: 0, max:59 });
  var condition4 = validator.isInt(endmin, {min: 0, max:59 });
  var condition5 = endmin * 60 + endsec >= startmin * 60 + endsec;
  var condition6 = validator.isURL(document.getElementById("startURL").value, {
    protocols: ['http','https'], 
    host_whitelist: ["www.youtube.com", "youtube.com", "www.youtu.be", "youtu.be"]
  });
  a += (condition0)? 1 : 0; b += 1;
  a += (condition1)? 1 : 0; b += 1;
  a += (condition2)? 1 : 0; b += 1;
  a += (condition6)? 1 : 0; b += 1;
  if (a == b) {
    if (condition3 && condition4 && condition5) {
      // Both valid start and end times provided
      var starttime = startmin * 60 + startsec;
      var endtime = endmin * 60 + endmin;
      // URL construction formatted based on the following stackoverflow comment:
      // http://webapps.stackexchange.com/a/61398
      var finalURL = "https://youtube.com/v/" + youtube_id + 
        "&start=" + starttime + "&end=" + endtime + "&autoplay=1";
      document.getElementById("newURL").value = finalURL;
    } else {
      // Only valid start time provided
    }
  } else {
    // error
  }
}

// Function taken from the following stackoverflow comment
// http://stackoverflow.com/a/8260383/3161979
function youtube_parser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}
