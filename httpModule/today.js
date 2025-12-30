module.exports.getDate = function getDate(){
    // Get the current date and time in the timezone
    const dateNow = new Date().toLocaleDateString("en-US", {timeZone: "Australia/Brisbane"});
    let aestDate = new Date(dateNow);
    return aestDate;
}
