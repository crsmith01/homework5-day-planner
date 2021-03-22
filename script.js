// Globally-scoped variables



// Moment to display current day, date, and time
// var currentDay = moment().format("dddd, MMMM Do, YYYY");
// $("#currentDay").text(currentDay);

var updateDateAndTime = function() {
    $("#currentTime").text(moment().format("h:mm:ss a"));
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));
};
updateDateAndTime();
setInterval(updateDateAndTime, 1000);

// jQuery UIs





// // Event listener for save button
// $()



// // Other functions
// var currentHour = ;

// // Array with business hours
// var hours = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
// ];




// // Color coding table rows based on past, present, and future hours (9 hours total, starting at 9 o'clock so up to 18)- for loop????
// for (var i = 9, i < 18, i++) {
//     if (currentHour > j) {

//     }

//     if (currentHour === j) {

//     }

//     if (currentHour < j) {

//     }
// };


