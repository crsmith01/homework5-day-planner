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
$('.saveBtn').click(function (e) {
    e.preventDefault();
    // Identifies what row to save to local storage
    var id = $(this).data('timeslot');
    // Saves the row and task item to local storage
    let task = {
        timeslot: $(this).data('timeslot'),
        message: $('#' + id + 'text').val(),
    };
    localStorage.setItem(task.timeslot, task.message);
    console.log("saved") 
    // so saved button is working but local storage is not
});


// $('.saveBtn').on('click', function(){

//     $('input[type="text"]').each(function(){    
//         var id = $(this).attr('id');
//         var value = $(this).val();
//        localStorage.setItem(id, value);

//     });   
// });

// $('#load').on('click', function(){
//     $('input[type="text"]').each(function(){    
//         var id = $(this).attr('id');
//         var value = localStorage.getItem(id);

//         $(this).val(value);

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
})