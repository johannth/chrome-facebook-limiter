function onOutOfTime()
{
    $("body").html("<div id=\"no-more-facebook\">No more Facebook today! :(</div>");
}

function getFriendlyTimeFromSeconds(seconds)
{
    var minutes = Math.floor(seconds / 60),
    hours = Math.floor(seconds / (60 * 60));
    
    seconds -= hours * 60 * 60 + minutes * 60; 
    
    if(hours === 0)
    {
        return zeroPad(minutes) + ":" + zeroPad(seconds);
    }
    else
    {
        return zeroPad(hours) + ":" + zeroPad(minutes) + ":" + zeroPad(seconds);
    }
}

function zeroPad(number)
{
    if(number < 10)
    {
        return "0" + number;
    }
    else
    {
        return "" + number;
    }
}

function updateCountdownTimer(remainingSeconds)
{
    $("#countdown-timer").html("Time remaining today: " + getFriendlyTimeFromSeconds(remainingSeconds));
}

$("body").prepend("<div id=\"countdown-timer\"></div>");

chrome.extension.sendRequest({method: "openTab"});

setInterval (function()
{
    chrome.extension.sendRequest({method: "getRemainingSeconds"}, function(response) {
        updateCountdownTimer(response.remainingSeconds);
    
        if(response.remainingSeconds < 0)
        {
            onOutOfTime();
        }
    });
}, 1000);

$(window).bind('beforeunload', function() { chrome.extension.sendRequest({method: "closeTab"}); });