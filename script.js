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


function setLocalStorage(objKey, objValue) {
    var dailySchedule = JSON.parse(localStorage.getItem("dailySchedule") || "{}");
    dailySchedule[objKey] = objValue;
    localStorage.setItem("dailySchedule", JSON.stringify(dailySchedule));
}


$(document).ready(function() {
    var scheduledItems = JSON.parse(localStorage.getItem("dailySchedule") || "{}");
    var taskItem = $(".userTask")
    $.each(taskItem, function(index, object) {
        var object = $(object);
        var dataValue = object.attr("value");

        $.each(scheduledItems, function (key, value) {
            if (key == dataValue) {
                object.text(value);
            }
        });
    });
});



init();
function init() {
    for (var i = 9; i < 18; i++) {
        $("#" + i + "text").val(localStorage.getItem(i));
    }
};


// // Event listener for save button
// $('.saveBtn').click(function (e) {
//     e.preventDefault();
//     // Identifies what row to save to local storage
//     var id = $(this).data('timeslot');
//     // Saves the row and task item to local storage
//     let task = {
//         timeslot: $(this).data('timeslot'),
//         message: $('#' + id + 'text').val(),
//     };
//     localStorage.setItem(task.timeslot, task.message);
//     console.log("saved") 
//     // so saved button is working but local storage is not
// });


$('.saveBtn').on('click', function(){

    $('input[type="text"]').each(function(){    
        var id = $(this).attr('id');
        var value = $(this).val();
       localStorage.setItem(id, value);

    });   
// });

// $('#load').on('click', function(){
//     $('input[type="text"]').each(function(){    
//         var id = $(this).attr('id');
//         var value = localStorage.getItem(id);

//         $(this).val(value);

//     }); 
// });


// //takes 'event description' in modal and passes to user interface
// $('#saveBtn').click(function() {
//     // gets value of user input
//     var eventInformation = $('#eventDescription').val(); 
    
//     // to get HTML of <span> #chosenTime' field of modal. This returns a few HTML elements but I want index[1]
//     var chosenTimeHTML = $(this).parent().siblings().prev()[1].querySelector('span');

//     //cast chosenTimeHTML to jQuery object
//     var chosenTimeHTML = $(chosenTimeHTML);

//     // to get data-hourValue data attribute 
//     var dataAttribute = chosenTimeHTML.attr('data-hourValue');

//     //loops through each row to see if data-value == data-hourValue of current chosen row
//     $(".eventInfo").each(function(i, object) {
//         var object = $(object);   //converts to jQuery object

//         // if data-value of .eventInfo == dataAttribute, set text of input box to that cell in scheduler
//         if (object.attr('value') == dataAttribute) {
//             object.html(eventInformation);
            
//             //set values to localStorage
//             setLocalStorage(dataAttribute, eventInformation);
//         }
//     });
// });





// Color coding table rows based on past, present, and future hours.
// 
$(".timeslot").each(function() {
    var time = $(this).data("time");                   
    var now = moment().hour();

    if (time < now) {
        $(this).parent().setAtrribute("style", "background-color: #d3d3d3");
    } else if (time = now) {
        $(this).parent().setAtrribute("style", "background-color: #ff6961");
    } else if (time > now) {
        $(this).parent().setAtrribute("style", "background-color: #77dd77");
    }
});