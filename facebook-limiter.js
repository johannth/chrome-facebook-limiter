function noMoreFacebookToday()
{
    $("body").html("<div id=\"no-more-facebook\">It's time to do something more productive! :)</div>");
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
    $("#countdown-timer").removeClass("disabled").html("Time remaining today: " + getFriendlyTimeFromSeconds(remainingSeconds));
}

function disableTimeLimit()
{
    $("#countdown-timer").addClass("disabled");
}

function updateNumberOfVisits(numberOfVisits, maxVisits)
{
     $("#number-of-visits").removeClass("disabled").html("Number of visits today: " + numberOfVisits + "/" + maxVisits);
}

function disableNumberOfVisits()
{
    $("#number-of-visits").addClass("disabled");
}

$("body").prepend("<div id=\"limiter\"><div class=\"container\"><div id=\"countdown-timer\">Loading timer...</div><div id=\"number-of-visits\">Loading number of visits...</div></div></div>");

chrome.extension.sendRequest({method: "openTab"});

setInterval (function()
{
    chrome.extension.sendRequest({method: "update"}, function(response) {
        if(response.limitTime)
        {
            updateCountdownTimer(response.remainingSeconds);
        }
        else
        {
            disableTimeLimit();
        }
        
        if(response.limitVisits)
        {
            updateNumberOfVisits(response.numberOfVisitsToday, response.maxVisits);
        }
        else
        {
            disableNumberOfVisits();
        }
    
        if(response.remainingSeconds < 0 || response.numberOfVisitsToday >= response.maxVisits)
        {
            noMoreFacebookToday();
        }
    });
}, 1000);

$(window).bind('beforeunload', function() { chrome.extension.sendRequest({method: "closeTab"}); });