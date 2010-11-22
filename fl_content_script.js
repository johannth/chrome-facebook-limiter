var fl_ContentScript = function() 
{
    var instance = this;
    this.port = chrome.extension.connect();
    this.port.onMessage.addListener(function(msg)
    {
        instance.onResponse(msg);
    });
};

fl_ContentScript.prototype.noMoreFacebookToday = function()
{
    $("body").html("<div id=\"no-more-facebook\">It's time to do something more productive! :)</div>");
};

fl_ContentScript.prototype.getFriendlyTimeFromSeconds = function(seconds)
{
    var minutes = Math.floor(seconds / 60),
    hours = Math.floor(seconds / (60 * 60));
    
    seconds -= hours * 60 * 60 + minutes * 60; 
    
    if(hours === 0)
    {
        return this.zeroPad(minutes) + ":" + this.zeroPad(seconds);
    }
    else
    {
        return this.zeroPad(hours) + ":" + this.zeroPad(minutes) + ":" + this.zeroPad(seconds);
    }
};

fl_ContentScript.prototype.zeroPad = function(number)
{
    if(number < 10)
    {
        return "0" + number;
    }
    else
    {
        return "" + number;
    }
};

fl_ContentScript.prototype.updateCountdownTimer = function(remainingSeconds)
{
    $("#countdown-timer").removeClass("disabled").html("Time remaining today: " + this.getFriendlyTimeFromSeconds(remainingSeconds));
};

fl_ContentScript.prototype.disableTimeLimit = function()
{
    $("#countdown-timer").addClass("disabled");
};

fl_ContentScript.prototype.updateNumberOfVisits = function(numberOfVisits, maxVisits)
{
     $("#number-of-visits").removeClass("disabled").html("Number of visits today: " + numberOfVisits + "/" + maxVisits);
};

fl_ContentScript.prototype.disableNumberOfVisits = function()
{
    $("#number-of-visits").addClass("disabled");
};

fl_ContentScript.prototype.addTimerToBody = function()
{
    $("body").prepend("<div id=\"limiter\"><div class=\"container\"><div id=\"countdown-timer\">Loading timer...</div><div id=\"number-of-visits\">Loading number of visits...</div></div></div>");
};

fl_ContentScript.prototype.notifyOpenTab = function()
{  
    this.port.postMessage({method: "openTab"});
};

fl_ContentScript.prototype.onResponse = function(response)
{
    if(response.limitTime)
    {
        this.updateCountdownTimer(response.remainingSeconds);
    }
    else
    {
        this.disableTimeLimit();
    }
    
    if(response.limitVisits)
    {
        this.updateNumberOfVisits(response.numberOfVisitsToday, response.maxVisits);
    }
    else
    {
        this.disableNumberOfVisits();
    }

    if(response.remainingSeconds < 0 || response.numberOfVisitsToday >= response.maxVisits)
    {
        this.noMoreFacebookToday();
    }
};

fl_ContentScript.prototype.startTimer = function()
{
    var instance = this;
    
    setInterval (function()
    {
        instance.port.postMessage({method: "update"});
    }, 1000);
};

$(function()
{
var injectedScript = new fl_ContentScript();
injectedScript.addTimerToBody();
injectedScript.notifyOpenTab();
injectedScript.startTimer();
});