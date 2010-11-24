String.prototype.startsWith = function(str) 
{
    return (this.match("^"+str)==str)
};

var fl_Database = function()
{
    if(localStorage["numberOfOpenTabs"] === undefined)
    {
        this.initNumberOfOpenTabs();
    }
    
    if(localStorage["numberOfVisitsToday"] === undefined)
    {
        this.initNumberOfVisitsToday();
    }
    
    if(localStorage["maxAllowedVisitsPerDay"] === undefined)
    {
        this.initMaxAllowedVisitsPerDay();
    }
    
    if(localStorage["maxAllowedSecondsPerDay"] === undefined)
    {
        this.initMaxAllowedSecondsPerDay();
    }
    
    if(localStorage["limitTime"] === undefined)
    {
        this.setShouldLimitTime(true);
    }
    
    if(localStorage["limitVisits"] === undefined)
    {
        this.setShouldLimitVisits(true);
    } 
    
    this.urls = [];
};

fl_Database.prototype.getNumberOfOpenTabs = function()
{
    return parseInt(localStorage["numberOfOpenTabs"], 10);
};

fl_Database.prototype.setNumberOfOpenTabs = function(numberOfOpenTabs)
{
    localStorage["numberOfOpenTabs"] = numberOfOpenTabs;
};

fl_Database.prototype.initNumberOfOpenTabs = function()
{
    this.setNumberOfOpenTabs(0);
};

fl_Database.prototype.initNumberOfVisitsToday = function()
{
    this.setNumberOfVisitsToday(0);
};

fl_Database.prototype.getNumberOfVisitsToday = function()
{
    return parseInt(localStorage["numberOfVisitsToday"], 10);
};

fl_Database.prototype.setNumberOfVisitsToday = function(numberOfVisitsToday)
{
    localStorage["numberOfVisitsToday"] = numberOfVisitsToday;
};

fl_Database.prototype.initMaxAllowedVisitsPerDay = function()
{
    this.setMaxAllowedVisitsPerDay(10);
};

fl_Database.prototype.getMaxAllowedVisitsPerDay = function()
{
    return parseInt(localStorage["maxAllowedVisitsPerDay"], 10);
};

fl_Database.prototype.setMaxAllowedVisitsPerDay = function(visitsPerDay)
{
    localStorage["maxAllowedVisitsPerDay"] = visitsPerDay;
};

fl_Database.prototype.initMaxAllowedSecondsPerDay = function()
{
    this.setMaxAllowedSecondsPerDay(60 * 20);
};

fl_Database.prototype.getMaxAllowedSecondsPerDay = function()
{
    return parseInt(localStorage["maxAllowedSecondsPerDay"], 10);
};

fl_Database.prototype.setMaxAllowedSecondsPerDay = function(secondsPerDay)
{
    localStorage["maxAllowedSecondsPerDay"] = secondsPerDay;
};

fl_Database.prototype.getRemainingSeconds = function()
{    
    return parseInt(localStorage["secondsRemaining"], 10);
};

fl_Database.prototype.setRemainingSeconds = function(seconds)
{
    localStorage["secondsRemaining"] = seconds;
};

fl_Database.prototype.setShouldLimitVisits = function(shouldLimitVisits)
{
    localStorage["limitVisits"] = shouldLimitVisits;
};

fl_Database.prototype.shouldLimitVisits = function()
{
    return localStorage["limitVisits"] === "true";
};

fl_Database.prototype.setShouldLimitTime = function(shouldLimitTime)
{
    localStorage["limitTime"] = shouldLimitTime;
};

fl_Database.prototype.shouldLimitTime = function()
{
    return localStorage["limitTime"] === "true";
};

fl_Database.prototype.isFirstVisitOfTheDay = function(currentDay)
{
    return localStorage["yearOfLastVisit"] !== "" + currentDay.getFullYear() ||
        localStorage["monthOfLastVisit"] !== "" + currentDay.getMonth() ||
        localStorage["dateOfLastVisit"] !== "" + currentDay.getDate();
};

fl_Database.prototype.setLastVisit = function(dateOfLastVisit)
{
    localStorage["yearOfLastVisit"] = dateOfLastVisit.getFullYear();
    localStorage["monthOfLastVisit"] = dateOfLastVisit.getMonth();
    localStorage["dateOfLastVisit"] = dateOfLastVisit.getDate();
};


fl_Database.prototype.resetExtension = function()
{
    this.setRemainingSeconds(this.getMaxAllowedSecondsPerDay());
    this.setNumberOfVisitsToday(0);
};