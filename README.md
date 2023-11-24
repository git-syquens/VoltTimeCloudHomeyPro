# VoltTimeCloudHomeyPro

 I created this Homey script upon release from Volt Time of their Cloud API
 The Cloud API documentation is still being improved on - but is very good as it is.
 For full reference please visit: https://developer.volttime.com/api-reference/introduction

The first script that I publish now is intended on getting information on;
> User
>> Team
>>> Site
>>>> Charger
>>>>> Connector

Volt Time organizes the resources in this hierarchical way
 I plan to extend this first script further in a next release so that you may specify a specific team,
 site, charger or connector. For now it just searches and lists the first occurence of every hierarchical object.
 That should however fit most usecases of home-owners nicely - as long as they have one single charger with a single connector.

 Happy to collaberate on further improvements !
 My priorities next are to work on more specific scripts that use the post commands such as enabling/disabling the connector itself.
 I do see a good use for that - as you may apply a geofence that monitors you/your car and actively disables the connector.
 That way the configuration of the charger can remain in plug-and-charge while making sure nobody but you can use the charger while you are gone.
 You can then even extend that courtesy to multiple cars/persons - even if you're not there.
 This might come in handy when you have a charger that is easily accessible by road.
 
The Script exposes the following tags - and when you run it directly under homey script - it shows the tag content in the output.

VoltTimeUserID,VoltTimeName,VolTimeAccount,VoltTimeTeamID,VoltTimeTeamType,VoltTimeTeamContact,VoltTimeSiteID,VoltTimeSiteName,VoltTimeSiteStreet,VoltTimeSitePostalCode,VoltTimeSiteHouseNumber,VoltTimeSiteHouseNumberAddition,VoltTimeSiteCity,VoltTimeSiteCountry,VoltTimeSitePhase,VoltTimeSiteMainFuseAmperage,VoltTimeSiteLoadManagement,VoltTimeSiteNetType,VoltTimeChargerID,VoltTimeChargerIdentity,VoltTimeChargerConnectionStatus: online,VoltTimeChargerStatus: Available,VoltTimeChargerError,VoltTimeChargerErrorDetail,VoltTimeChargerDetailConnectorID,VoltTimeChargerDetailConnectorStatus,VoltTimeChargerDetailConnectorError,VoltTimeChargerConnectorErrorDetail
