
$(document).ready(function () {
    var currentHour = moment().hour();

// Moment to display current day, date, and time in jumbotron
var update = function () {
        $('#currentDay').text(moment().format('dddd, MMMM Do'));
        $('#currentTime').text(moment().format('h:mm:ss a'));
    };
    update();
    // Updates the time every second, so clock in jumbotron is always up-to-date.
    setInterval(update, 1000);

    // Created array of standard business hours for the timetable
    const businessHours = [
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM',
        '5:00 PM - 6:00 PM',
    ];

    // Used a for loop to generate table based on length of above array (business hours)
    for (var i = 0; i < businessHours.length; i++) {
        // Make the current hour a variable on a 24-hr clock 
        var dataHour = [i + 9];
        // jQuery to create a row
        var createRow = $('<tr class="timeColor">');
        // jQuery to populate the first column of the table - the businessHours array and dataHour
        var timeRow = $(`<td class="align-middle"><p class="time" id="${businessHours[i]}" data-hour="${dataHour}">${businessHours[i]}</p></td>`);
        // jQuery to create a the second column of the table - a textbox and dataHour
        var task = $(`<td class="align-middle"><textarea class="form-control taskText" id="${dataHour}text" rows="3"></textarea></td>`);
        // jQuery to create the third column - a save button and dataHour
        var save = $(`<td class="align-middle"><i class="far fa-save fa-3x saveBtn" data-hour="${dataHour}"></i></td>`);
        
        // Appended the newly created table data to the table row
        createRow.append(timeRow, task, save);
        // Appended the table row to the body of the table in html
        $('tbody').append(createRow);
    };

    // Local storage utiziled to save and display what user types in text area
    init();
    function init() {
        for (var i = 9; i < 18; i++) {
            // Populates textareas with existing local storage
            $('#' + i + 'text').val(localStorage.getItem(i));
        }
    };
    
    // Color coding table rows based on past, present, and future hours.
    // For loop through each row on the table, starting at 9 (for 9am - start of business hours)
    for (var i = 9; i < 18; i++) {
        //  Make the background grey iff the current hour is less than the loop iteration value (starting at 9).
        if (currentHour > i) {
            $('.timeColor')
            // Used the eq() jQuery method - returns an element with a specific index number of the selected elements
                .eq(i - 9)
                .css('background-color', '#d3d3d3');
        }
        // Make the background red if the current hour is equal to the loop iteration value (starting at 9).
        if (currentHour === i) {
            $('.timeColor')
                .eq(i - 9)
                .css('background-color', '#ff6961');
        }
        // Make the background green if the current hour is more than the loop iteration value (starting at 9).
        if (currentHour < i) {
            $('.timeColor')
                .eq(i - 9)
                .css('background-color', '#77dd77');
        }
    };

  // Event listener for save button
  $('.saveBtn').click(function (e) {
    e.preventDefault();
    // Identifies what row is being saved to local storage
    var id = $(this).data('hour');
    // Saves the row and task item into local storage
    let task = {
        hour: $(this).data('hour'),
        message: $('#' + id + 'text').val(),
    };
    localStorage.setItem(task.hour, task.message);
    console.log('saved');
  });

});

