function noMoreFacebookToday()
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

function updateNumberOfVisits(numberOfVisits, maxVisits)
{
     $("#number-of-visits").html("Number of visits today: " + numberOfVisits + "/" + maxVisits);
}

$("body").prepend("<div id=\"limiter\"><div id=\"countdown-timer\"></div><div id=\"number-of-visits\"></div></div>");

chrome.extension.sendRequest({method: "openTab"});

setInterval (function()
{
    chrome.extension.sendRequest({method: "update"}, function(response) {
        updateCountdownTimer(response.remainingSeconds);
        updateNumberOfVisits(response.numberOfVisitsToday, response.maxVisits);
    
        if(response.remainingSeconds < 0 || response.numberOfVisitsToday >= response.maxVisits)
        {
            noMoreFacebookToday();
        }
    });
}, 1000);

$(window).bind('beforeunload', function() { chrome.extension.sendRequest({method: "closeTab"}); });