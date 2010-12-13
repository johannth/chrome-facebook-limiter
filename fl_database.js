var fl_Database = function()
{   
    this.userID = "-1";
    this.userStorage = {};
    this.initUserStorageIfNecessary();
};

fl_Database.prototype.initUserStorageIfNecessary = function()
{
    if(this.userStorage["numberOfOpenTabs"] === undefined)
    {
        this.initNumberOfOpenTabs();
    }
    
    if(this.userStorage["numberOfVisitsToday"] === undefined)
    {
        this.initNumberOfVisitsToday();
    }
    
    if(this.userStorage["maxAllowedVisitsPerDay"] === undefined)
    {
        this.initMaxAllowedVisitsPerDay();
    }
    
    if(this.userStorage["maxAllowedSecondsPerDay"] === undefined)
    {
        this.initMaxAllowedSecondsPerDay();
    }
    
    if(this.userStorage["limitTime"] === undefined)
    {
        this.setShouldLimitTime(true);
    }
    
    if(this.userStorage["limitVisits"] === undefined)
    {
        this.setShouldLimitVisits(true);
    }
};

fl_Database.prototype.hasUser = function()
{
    return this.userID !== "";
};

fl_Database.prototype.setUserID = function(userID)
{
    if(userID !== this.userID)
    {
        this.saveUserStorage();
        this.userID = userID;
        this.userStorage = JSON.parse(localStorage.getItem(userID));
        if(this.userStorage === null)
        {
            this.userStorage = {};
        }
        this.initUserStorageIfNecessary();
        this.saveUserStorage();
    }
};

fl_Database.prototype.saveUserStorage = function()
{
    localStorage.setItem(this.userID, JSON.stringify(this.userStorage));
};

fl_Database.prototype.getNumberOfOpenTabs = function()
{
    return this.userStorage["numberOfOpenTabs"];
};

fl_Database.prototype.setNumberOfOpenTabs = function(numberOfOpenTabs)
{
    if(numberOfOpenTabs >= 0)
    {
        this.userStorage["numberOfOpenTabs"] = numberOfOpenTabs;
        this.saveUserStorage();
    }
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
    return this.userStorage["numberOfVisitsToday"];
};

fl_Database.prototype.setNumberOfVisitsToday = function(numberOfVisitsToday)
{
    this.userStorage["numberOfVisitsToday"] = numberOfVisitsToday;
    this.saveUserStorage();
};

fl_Database.prototype.initMaxAllowedVisitsPerDay = function()
{
    this.setMaxAllowedVisitsPerDay(10);
};

fl_Database.prototype.getMaxAllowedVisitsPerDay = function()
{
    return this.userStorage["maxAllowedVisitsPerDay"];
};

fl_Database.prototype.setMaxAllowedVisitsPerDay = function(visitsPerDay)
{
    this.userStorage["maxAllowedVisitsPerDay"] = visitsPerDay;
    this.saveUserStorage();
};

fl_Database.prototype.initMaxAllowedSecondsPerDay = function()
{
    this.setMaxAllowedSecondsPerDay(60 * 20);
};

fl_Database.prototype.getMaxAllowedSecondsPerDay = function()
{
    return this.userStorage["maxAllowedSecondsPerDay"];
};

fl_Database.prototype.setMaxAllowedSecondsPerDay = function(secondsPerDay)
{
    this.userStorage["maxAllowedSecondsPerDay"] = secondsPerDay;
    this.saveUserStorage();
};

fl_Database.prototype.getRemainingSeconds = function()
{    
    return this.userStorage["secondsRemaining"];
};

fl_Database.prototype.setRemainingSeconds = function(seconds)
{
    this.userStorage["secondsRemaining"] = seconds;
    this.saveUserStorage();
};

fl_Database.prototype.setShouldLimitVisits = function(shouldLimitVisits)
{
    this.userStorage["limitVisits"] = shouldLimitVisits;
    this.saveUserStorage();
};

fl_Database.prototype.shouldLimitVisits = function()
{
    return this.userStorage["limitVisits"] === true;
};

fl_Database.prototype.setShouldLimitTime = function(shouldLimitTime)
{
    this.userStorage["limitTime"] = shouldLimitTime;
    this.saveUserStorage();
};

fl_Database.prototype.shouldLimitTime = function()
{
    return this.userStorage["limitTime"] === true;
};

fl_Database.prototype.isFirstVisitOfTheDay = function(currentDay)
{
    return this.userStorage["yearOfLastVisit"] !== currentDay.getFullYear() ||
        this.userStorage["monthOfLastVisit"] !== currentDay.getMonth() ||
        this.userStorage["dateOfLastVisit"] !== currentDay.getDate();
};

fl_Database.prototype.setLastVisit = function(dateOfLastVisit)
{
    this.userStorage["yearOfLastVisit"] = dateOfLastVisit.getFullYear();
    this.userStorage["monthOfLastVisit"] = dateOfLastVisit.getMonth();
    this.userStorage["dateOfLastVisit"] = dateOfLastVisit.getDate();
    this.saveUserStorage();
};

fl_Database.prototype.setNumberOfTabsToZeroForAllUsers = function()
{
    for(var i = 0; i != localStorage.length; i++)
    {
        var userID = localStorage.key(i);
        var userStorage = JSON.parse(localStorage.getItem(userID));
        userStorage["numberOfOpenTabs"] = 0;
        localStorage.setItem(userID, JSON.stringify(userStorage));
        
        if(this.userID === userID)
        {
            this.userStorage = userStorage;
        }
    }
};

fl_Database.prototype.resetExtension = function()
{
    this.setRemainingSeconds(this.getMaxAllowedSecondsPerDay());
    this.setNumberOfVisitsToday(0);
    this.setNumberOfOpenTabs(0);
};