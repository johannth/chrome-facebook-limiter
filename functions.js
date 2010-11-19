function setInitialValuesOnFirstLaunch()
{
    if(!localStorage["numberOfOpenTabs"])
    {
        localStorage["numberOfOpenTabs"] = 0;
    }
    
    if(!localStorage["numberOfVisitsToday"])
    {
        localStorage["numberOfVisitsToday"] = 0;
    }
    
    if(!localStorage["maxAllowedVisitsPerDay"])
    {
        localStorage["maxAllowedVisitsPerDay"] = 10;
    }
    
    if(!localStorage["maxAllowedSecondsPerDay"])
    {
        localStorage["maxAllowedSecondsPerDay"] = 60 * 20;
    }
    
    if(!localStorage["limitTime"])
    {
        localStorage["limitTime"] = true;
    }
    
    if(!localStorage["limitVisits"])
    {
        localStorage["limitTime"] = true;
    }
}

function getMaxAllowedVisitsPerDay()
{
    return parseInt(localStorage["maxAllowedVisitsPerDay"], 10);
}

function setMaxAllowedVisitsPerDay(visitsPerDay)
{
    localStorage["maxAllowedVisitsPerDay"] = visitsPerDay;
}

function getMaxAllowedSecondsPerDay()
{
    return parseInt(localStorage["maxAllowedSecondsPerDay"], 10);
}

function setMaxAllowedSecondsPerDay(secondsPerDay)
{
    localStorage["maxAllowedSecondsPerDay"] = secondsPerDay;
}

function resetExtension()
{
    setRemainingSeconds(getMaxAllowedSecondsPerDay());
    setNumberOfVisitsToday(0);
}

function getRemainingSeconds()
{    
    return parseInt(localStorage["secondsRemaining"], 10);
}

function setRemainingSeconds(seconds)
{
    localStorage["secondsRemaining"] = seconds;
}

function getNumberOfOpenTabs()
{
    return parseInt(localStorage["numberOfOpenTabs"], 10);
}

function setNumberOfOpenTabs(numberOfOpenTabs)
{
    localStorage["numberOfOpenTabs"] = numberOfOpenTabs;
}

function getNumberOfVisitsToday()
{
    return parseInt(localStorage["numberOfVisitsToday"], 10);
}

function setNumberOfVisitsToday(numberOfVisitsToday)
{
    localStorage["numberOfVisitsToday"] = numberOfVisitsToday;
}