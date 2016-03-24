//Omnibros CollaBROate Base Lib v0.00.00
//Created and maintained by Omnibros http://www.omnibros.net

//########Variable Declaration and Assignments::END#############################################\\
//----------------------------------------------------------------------------------------------------------------------------------------------------\\

//Configuration variables (adjust these values to fit your implementation)
var portalBaseUrl       = "http://www.omnibros.net";				//Portal BaseURL (Primary)
var streamUrl           = "http://radio.omnibros.net:777/listen";
var obRadioPlayerObject = document.getElementById("obRadioPlayer");	//Instantiantes Media Player Handle

function initHandlers() {
    var playerobj = document.getElementById("obRadioPlayer");

    playerobj.onloadedmetadata = function (e) {
        playerStreamLoaded();
    }
    playerobj.ontimeupdated = function (e) {
        playTimeUpdate(obRadioPlayerObject.currentTime);
    }

    playerobj.addEventListener('loadedmetadata', function (e) {
        playerStreamLoaded();
    });

    playerobj.addEventListener('timeupdated', function (e) {
        playtimeUpdate(obRadioPlayerObject.currentTime);
    });

}

//Launches Omnibros homepage in a new tab
function OpenOBHome() {
    OBHomeWindow = window.open(portalBaseUrl);
}

//Fires HTML5 Audio Tag Play() function and changes the visual attributes of the player to "Playing Mode"
function playerStart() {
    document.getElementById("obRadioPlayer").play();
    document.getElementById("signalMeter").src = "images/signalPlayerPlaying.gif";
    playingDJ = "Cache [ob]";
    playingSong = "Ravin Hood";
}

//Fires HTML5 Audio Tag Pause() function and changes the visual attributes of the player to "Stopped Mode"
function playerStop() {
    document.getElementById("obRadioPlayer").pause();
    document.getElementById("signalMeter").src = "images/signalPlayerStopped.gif";
    document.getElementById("playTimeValue").innerHTML = "__:__:__";
    playingDJ = "";
    playingSong = "";
}

//Allows for single-button Play/Pause toggle by establishing current state when the button is clicked and then fires Play or Pause functions
function playerStartStop() {
    if (document.getElementById("obRadioPlayer").paused || document.getElementById("obRadioPlayer").ended || 0 >= document.getElementById("obRadioPlayer").currentTime) {
        playerStart();
    } else {
        playerStop();
    }
}

//Updates current time playing on custom player
function playTimeUpdate(playTimeSeconds) {
    if (document.getElementById("obRadioPlayer").paused || document.getElementById("obRadioPlayer").ended) {
        document.getElementById("playTimeValue").innerHTML = "__:__:__";
        document.getElementById("isLiveTextValue").innerHTML = "Paused";
        document.getElementById("isLiveTextValue").className = "playerStats playingBroadcastValue";
        document.getElementById("playingDJ").innerHTML = "DJ:";
        document.getElementById("playingSong").innerHTML = "Mix:";
    }
    else {
        var playTimeFormatted = new Date(null);
        playTimeFormatted.setSeconds(playTimeSeconds);
        document.getElementById("playTimeValue").innerHTML = playTimeFormatted.toISOString().substr(11, 8);
        document.getElementById("isLiveTextValue").innerHTML = "Live!!!";
        document.getElementById("isLiveTextValue").className = "playerStats  isLiveText playingBroadcastValue";
        document.getElementById("playingDJ").innerHTML = "DJ: " + playingDJ;
        document.getElementById("playingSong").innerHTML = "Mix: " + playingSong;
    }
}

function playerStreamLoaded() {
    document.getElementById("isLiveTextValue").innerHTML = "Ready";
    document.getElementById("signalMeter").src = "images/signalPlayerStopped.gif";
    if (autoPlayIs == "On") {
        playerStart();
    }
}

function popOutPlayerStreamLoaded() {
    document.getElementById("isLiveTextValue").innerHTML = "Ready";
    document.getElementById("signalMeter").src = "images/signalPlayerStopped.gif";
    playerStart();
}

//Executes at page load to instantiate initial page functionality, redirects and restylings
function initPage() {
    initHandlers();
    document.getElementById("obRadioPlayer").src = streamUrl;
    document.addEventListener('DOMContentLoaded', initHandlers, false);
    obRadioPlayerObject = document.getElementById("obRadioPlayer");
    this.window.resizeTo(270, 335);
}
