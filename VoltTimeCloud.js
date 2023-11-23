/*
 This Script is intended to fetch data from the VoltTimeCloud API
 And explore the content of this API and it's use within Homey
 */

// Create the request

// Retrieving The ApiKey from BetterLogic makes this script more secure
// And also allows me to share/update it without concerning myself if I'm oversharing ;-)

//Testing retrieval of BetterLogic variables

//Setting.AppID
let BLApp = await Homey.apps.getApp({id:"net.i-dev.betterlogic" });

//get Better Logic variable
let VarStore = await BLApp.apiGet("VoltTimeCloudAPIKey");
let apikey = VarStore.value;
// If you run into issues with authorization, first thing to
// check is if you actually get the right token from
// the variable store within Better Logic
// If in doubt - uncomment the below line and check in the log
// if the content is what you expected it to be
// DON'T EVER share the output of log with this line enabled to anyone
// Access to the key means; complete access to your account

//log(apikey);


//Fetch UserData Volt Time Cloud
const VTCUser = await fetch('https://cloud.volttime.com/api/v2/user', 
{
  headers: { Authorization: 'Bearer ' + apikey}
});
if (!VTCUser.ok) {
  throw new Error(VTCUser.statusText);
}
const VTCUserbody = await VTCUser.json();

//Fetch TeamData Volt Time Cloud
//At this stage I have only developed this script to suit my (personal) means.
//With relevant (test)data I could probably make this script also check for all teams and expose
//tags and variables for each individual team - for now this suits my - and probably others personal needs
const VTCTeam = await fetch('https://cloud.volttime.com/api/v2/teams', 
{
  headers: { Authorization: 'Bearer ' + apikey}
});
if (!VTCTeam.ok) {
  throw new Error(VTCTeam.statusText);
}
const VTCTeambody = await VTCTeam.json();


//Uncomment any of the below bodies to see the complete body of that topic
//log(VTCTeambody);
//log(VTCUserbody);

// Set Variables
//VoltTimeUserID
await tag ('VoltTimeUserID', VTCUserbody.id);
let VoltTimeUserID = VTCUserbody.id;
log ('Tag VoltTimeUserID: '+ VoltTimeUserID);
//VoltTimeUserName
await tag ('VoltTimeUserName', VTCUserbody.name);
let VoltTimeUserName = VTCUserbody.name;
log ('Tag VoltTimeName: '+ VoltTimeUserName);
//VoltTimeAccount
await tag ('VoltTimeAccount', VTCUserbody.email);
let VoltTimeAccount = VTCUserbody.email;
log ('Tag VolTimeAccount: '+ VoltTimeAccount);
//VoltTimeTeamID
await tag ('VoltTimeTeamID', VTCTeambody.data[0].id);
let VoltTimeTeamID = VTCTeambody.data[0].id;
log ('Tag VoltTimeTeamID: '+ VoltTimeTeamID);
//VoltTimeTeamType
await tag ('VoltTimeTeamType', VTCTeambody.data[0].type);
let VoltTimeTeamType = VTCTeambody.data[0].type;
log ('Tag VoltTimeTeamType: '+ VoltTimeTeamType);
//VoltTimeTeamContact
await tag ('VoltTimeTeamContact', VTCTeambody.data[0].email);
let VoltTimeTeamContact = VTCTeambody.data[0].email;
log ('Tag VoltTimeTeamContact: '+ VoltTimeTeamContact);

//Fetch SiteData Volt Time Cloud
//At this stage - the team has to be linked in the request for it's relevant sites
//As documented earlier - I'm only fitting this script to suit the first team - and also- the first site
//Later this can probably be improved on - by enumerating sites for a given team.
const VTCSite = await fetch('https://cloud.volttime.com/api/v2/teams/'+ VoltTimeTeamID+'/sites/', 
{
  headers: { Authorization: 'Bearer ' + apikey}
});
if (!VTCSite.ok) {
  throw new Error(VTCSite.statusText);
}
const VTCSitebody = await VTCSite.json();

//Uncomment any of the below bodies to see the complete body of that topic
//log(VTCSitebody);

// Set Variables

//VoltTimeSiteID
await tag ('VoltTimeSiteID', VTCSitebody.data[0].id);
let VoltTimeSiteID = VTCSitebody.data[0].id;
log ('Tag VoltTimeSiteID: '+ VoltTimeSiteID);
//VoltTimeSiteName
await tag ('VoltTimeSiteName', VTCSitebody.data[0].name);
let VoltTimeSiteName = VTCSitebody.data[0].name;
log ('Tag VoltTimeSiteName: '+ VoltTimeSiteName);
//VoltTimeSiteStreet
await tag ('VoltTimeSiteStreet', VTCSitebody.data[0].street);
let VoltTimeSiteStreet = VTCSitebody.data[0].street;
log ('Tag VoltTimeSiteStreet: '+ VoltTimeSiteStreet);
//VoltTimeSitePostalCode
await tag ('VoltTimeSitePostalCode', VTCSitebody.data[0].postal_code);
let VoltTimeSitePostalCode = VTCSitebody.data[0].postal_code;
log ('Tag VoltTimeSitePostalCode: '+ VoltTimeSitePostalCode);
//VoltTimeSiteHouseNumber
await tag ('VoltTimeSiteHouseNumber', VTCSitebody.data[0].house_number);
let VoltTimeSiteHouseNumber = VTCSitebody.data[0].house_number;
log ('Tag VoltTimeSiteHouseNumber: '+ VoltTimeSiteHouseNumber);
//VoltTimeSiteHouseNumberAddition
await tag ('VoltTimeSiteHouseNumberAddition', VTCSitebody.data[0].house_number_addition);
let VoltTimeSiteHouseNumberAddition = VTCSitebody.data[0].house_number_addition;
log ('Tag VoltTimeSiteHouseNumberAddition: '+ VoltTimeSiteHouseNumberAddition);
//VoltTimeSiteCity
await tag ('VoltTimeSiteCity', VTCSitebody.data[0].city);
let VoltTimeSiteCity = VTCSitebody.data[0].city;
log ('Tag VoltTimeSiteCity: '+ VoltTimeSiteCity);
//VoltTimeSiteCountry
await tag ('VoltTimeSiteCountry', VTCSitebody.data[0].country);
let VoltTimeSiteCountry = VTCSitebody.data[0].country;
log ('Tag VoltTimeSiteCountry: '+ VoltTimeSiteCountry);
//VoltTimeSitePhase
await tag ('VoltTimeSitePhase', VTCSitebody.data[0].phase);
let VoltTimeSitePhase = VTCSitebody.data[0].phase;
log ('Tag VoltTimeSitePhase: '+ VoltTimeSitePhase);
//VoltTimeSiteMainFuseAmperage
await tag ('VoltTimeSiteMainFuseAmperage', VTCSitebody.data[0].main_fuse_amperage);
let VoltTimeSiteMainFuseAmperage = VTCSitebody.data[0].main_fuse_amperage;
log ('Tag VoltTimeSiteMainFuseAmperage: '+ VoltTimeSiteMainFuseAmperage);
//VoltTimeSiteLoadManagement
await tag ('VoltTimeSiteLoadManagement', VTCSitebody.data[0].load_management);
let VoltTimeSiteLoadManagement = VTCSitebody.data[0].load_management;
log ('Tag VoltTimeSiteLoadManagement: '+ VoltTimeSiteLoadManagement);
//VoltTimeSiteNetType
await tag ('VoltTimeSiteNetType', VTCSitebody.data[0].net_type);
let VoltTimeSiteNetType = VTCSitebody.data[0].net_type;
log ('Tag VoltTimeSiteNetType: '+ VoltTimeSiteNetType);

//Fetching Chargers. As previously mentioned - At this staging I'm only
//trying to get the first charger associated with the first site for the first team
//Changing the script up to allow for selectively adding more flexibility (for instance multiple chargers for the one site) shouldn't be to hard - but I'm trying to make this script complete first.

const VTCCharger = await fetch('https://cloud.volttime.com/api/v2/teams/'+ VoltTimeTeamID+'/chargers/', 
{
  headers: { Authorization: 'Bearer ' + apikey}
});

if (!VTCCharger.ok) {
  throw new Error(VTCCharger.statusText);
}
const VTCChargerbody = await VTCCharger.json();

//Uncomment any of the below bodies to see the complete body of that topic
//log(VTCChargerbody);

//VoltTimeChargerID
await tag ('VoltTimeChargerID', VTCChargerbody.data[0].id);
let VoltTimeChargerID = VTCChargerbody.data[0].id;
log ('Tag VoltTimeChargerID: '+ VoltTimeChargerID);
//VoltTimeChargerIdentity
await tag ('VoltTimeChargerIdentity', VTCChargerbody.data[0].identity);
let VoltTimeChargerIdentity = VTCChargerbody.data[0].identity;
log ('Tag VoltTimeChargerIdentity: '+ VoltTimeChargerIdentity);
//VoltTimeChargerConnectionStatus
await tag ('VoltTimeChargerConnectionStatus', VTCChargerbody.data[0].connection_status);
let VoltTimeChargerConnectionStatus = VTCChargerbody.data[0].connection_status;
log ('Tag VoltTimeChargerConnectionStatus: '+ VoltTimeChargerConnectionStatus);
//VoltTimeChargerStatus
await tag ('VoltTimeChargerStatus', VTCChargerbody.data[0].status);
let VoltTimeChargerStatus = VTCChargerbody.data[0].status;
log ('Tag VoltTimeChargerStatus: '+ VoltTimeChargerStatus);
//VoltTimeChargerError
await tag ('VoltTimeChargerError', VTCChargerbody.data[0].error);
let VoltTimeChargerError = VTCChargerbody.data[0].error;
log ('Tag VoltTimeChargerError: '+ VoltTimeChargerError);
//VoltTimeChargerErrorDetail
await tag ('VoltTimeChargerErrorDetail', VTCChargerbody.data[0].error_info);
let VoltTimeChargerErrorDetail = VTCChargerbody.data[0].error_info;
log ('Tag VoltTimeChargerErrorDetail: '+ VoltTimeChargerErrorDetail);


//modify query
const VTCChargerDetail = await fetch('https://cloud.volttime.com/api/v2/teams/'+ VoltTimeTeamID+'/chargers/'+ VoltTimeChargerID, 
{
  headers: { Authorization: 'Bearer ' + apikey}
});

if (!VTCChargerDetail.ok) {
  throw new Error(VTCChargerDetail.statusText);
}
const VTCChargerDetailbody = await VTCChargerDetail.json();

//Uncomment any of the below bodies to see the complete body of that topic
//log(VTCChargerDetailbody);
//log('checking reply: '+ VTCChargerbody);

//VoltTimeChargerDetailConnectorID
await tag ('VoltTimeChargerDetailConnectorID', VTCChargerDetailbody.data.connectors[0].id);
let VoltTimeChargerDetailConnectorID = VTCChargerDetailbody.data.connectors[0].id;
log ('Tag VoltTimeChargerDetailConnectorID: '+ VoltTimeChargerDetailConnectorID);
//VoltTimeChargerDetailConnectorStatus
await tag ('VoltTimeChargerDetailConnectorStatus', VTCChargerDetailbody.data.connectors[0].status);
let VoltTimeChargerDetailConnectorStatus = VTCChargerDetailbody.data.connectors[0].status;
log ('Tag VoltTimeChargerDetailConnectorStatus: '+ VoltTimeChargerDetailConnectorStatus);
//VoltTimeChargerDetailConnectorError
await tag ('VoltTimeChargerDetailConnectorError', VTCChargerDetailbody.data.connectors[0].error);
let VoltTimeChargerDetailConnectorError = VTCChargerDetailbody.data.connectors[0].error;
log ('Tag VoltTimeChargerDetailConnectorError: '+ VoltTimeChargerDetailConnectorError);
//VoltTimeChargerConnectorErrorDetail
await tag ('VoltTimeChargerConnectorErrorDetail', VTCChargerDetailbody.data.connectors[0].error_info);
let VoltTimeChargerConnectorErrorDetail = VTCChargerDetailbody.data.connectors[0].error_info;
log ('Tag VoltTimeChargerConnectorErrorDetail: '+ VoltTimeChargerConnectorErrorDetail);
