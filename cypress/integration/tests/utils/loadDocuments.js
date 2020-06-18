/**
 * Extracting the data from a CSV and binding it to variables
 */
const getCSVVariables = () => {
    const csv = 'WOQL.get(' + '\n' +
        'WOQL.as("Start station","v:Start_Station")' + '\n' +
        '.as("End station", "v:End_Station")' + '\n' +
        '.as("Start date", "v:Start_Time")' + '\n' +
        '.as("End date", "v:End_Time")' + '\n' +
        '.as("Duration", "v:Duration")' + '\n' +
        '.as("Start station number", "v:Start_ID")' + '\n' +
        '.as("End station number", "v:End_ID")' + '\n' +
        '.as("Bike number", "v:Bike")' + '\n' +
        '.as("Member type", "v:Member_Type")' + '\n' +
    ').remote("https://terminusdb.com/t/data/bikeshare/2011-capitalbikeshare-tripdata.csv")'
    return csv;
}


/**
 * Wrangling the imported data to make it line up nicely
 */
const wrangles = '[' + '\n' +
    'WOQL.idgen("doc:Journey",["v:Start_ID","v:Start_Time","v:Bike"],"v:Journey_ID"),' + '\n' +
    'WOQL.idgen("doc:Station",["v:Start_ID"],"v:Start_Station_URL"),' + '\n' +
    'WOQL.cast("v:Duration", "xsd:integer", "v:Duration_Cast"),' + '\n' +
    'WOQL.cast("v:Bike", "xsd:string", "v:Bike_Label"),' + '\n' +
    'WOQL.cast("v:Start_Time", "xsd:dateTime", "v:Start_Time_Cast"),' + '\n' +
    'WOQL.cast("v:End_Time", "xsd:dateTime", "v:End_Time_Cast"),' + '\n' +
    'WOQL.cast("v:Start_Station", "xsd:string", "v:Start_Station_Label"),' + '\n' +
    'WOQL.cast("v:End_Station", "xsd:string", "v:End_Station_Label"),' + '\n' +
    'WOQL.idgen("doc:Station",["v:End_ID"],"v:End_Station_URL"),' + '\n' +
    'WOQL.idgen("doc:Bicycle",["v:Bike_Label"],"v:Bike_URL"),' + '\n' +
    'WOQL.concat("v:Start_ID to v:End_ID at v:Start_Time","v:Journey_Label"),' + '\n' +
    'WOQL.concat("Bike v:Bike from v:Start_Station to v:End_Station at v:Start_Time until v:End_Time","v:Journey_Description")' + '\n' +
']'

const inserts = 'WOQL.and(' + '\n' +
    'WOQL.insert("v:Journey_ID", "Journey")' + '\n' +
        '.label("v:Journey_Label")' + '\n' +
        '.description("v:Journey_Description")' + '\n' +
        '.property("start_time", "v:Start_Time_Cast")' + '\n' +
        '.property("end_time", "v:End_Time_Cast")' + '\n' +
        '.property("duration", "v:Duration_Cast")' + '\n' +
        '.property("start_station", "v:Start_Station_URL")' + '\n' +
        '.property("end_station", "v:End_Station_URL")' + '\n' +
        '.property("journey_bicycle", "v:Bike_URL"),' + '\n' +
    'WOQL.insert("v:Start_Station_URL", "Station")' + '\n' +
        '.label("v:Start_Station_Label"),' + '\n' +
    'WOQL.insert("v:End_Station_URL", "Station")' + '\n' +
        '.label("v:End_Station_Label"),' + '\n' +
    'WOQL.insert("v:Bike_URL", "Bicycle")' + '\n' +
        '.label("v:Bike_Label"))' 

export const loadCSVs = () => {
    const csv = getCSVVariables();
    const inputs = 'WOQL.and(' + csv + ', ...' + wrangles + ')'
    return 'WOQL.when(' + inputs + ', ' + inserts + ')'
}