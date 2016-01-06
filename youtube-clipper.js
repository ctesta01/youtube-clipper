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
    var condition0 = youtube_parser(document.getElementById("startURL").value);
    var condition1 = validator.isInt(document.getElementById("startsec").value, {min: 0, max:59 });
    var condition2 = validator.isInt(document.getElementById("startmin").value, {min: 0, max:59 });
    var condition3 = validator.isInt(document.getElementById("endsec").value, {min: 0, max:59 });
    var condition4 = validator.isInt(document.getElementById("endmin").value, {min: 0, max:59 });
    var condition5 = document.getElementById("endmin").value * 60 + document.getElementById("endsec").value > document.getElementById("startmin").value * 60 + document.getElementById("startsec").value;
    var condition6 = validator.isURL(document.getElementById("startURL").value, {protocols: ['http','https'], host_whitelist: ["www.youtube.com", "youtube.com", "www.youtu.be", "youtu.be"]});
    a += (condition0)? 1 : 0; b += 1;
    a += (condition1)? 1 : 0; b += 1;
    a += (condition2)? 1 : 0; b += 1;
    a += (condition3)? 1 : 0; b += 1;
    a += (condition4)? 1 : 0; b += 1;
    a += (condition5)? 1 : 0; b += 1;
    a += (condition6)? 1 : 0; b += 1;
    console.log(condition0);
    console.log(condition1);
    console.log(condition2);
    console.log(condition3);
    console.log(condition4);
    console.log(condition5);
    console.log(condition6);

    if (a == b) {
        var youtube_id = youtube_parser(document.getElementById("startURL").value);
        var startsec = document.getElementById("startsec").value;
        var startmin = document.getElementById("startmin").value;
        var endsec = document.getElementById("endsec").value;
        var endmin = document.getElementById("endmin").value;
    }
}

// Function taken from the following stackoverflow comment
// http://stackoverflow.com/a/8260383/3161979
function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}


