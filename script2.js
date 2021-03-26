
  $(document).ready(function () {
    var currentHour = moment().hour();

// Moment to display current day, date, and time in jumbotron
var update = function () {
        $('#currentDay').text(moment().format('dddd, MMMM Do'));
        $('#currentTime').text(moment().format('h:mm:ss a'));
    };
    update();
    setInterval(update, 1000);

    // Array with hours for scheduler
    const hours = [
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

    //---------------
    // Loop to make table based on length of hours array
    //---------------
    for (var i = 0; i < hours.length; i++) {
        //Assign current hour in 24-hr notation to a variable
        var dataHour = [i + 9];
        // Create a row
        var tRow = $('<tr class="hourColor">');
        // Populate first column with hours array along with dataHour
        var hourRow = $(
            `<td class="align-middle"><h3 class="time" id="${hours[i]}" data-hour="${dataHour}">${hours[i]}</h3></td>`
        );
        // Create a column with a textbox along with dataHour
        var task = $(
            `<td class="align-middle"><textarea class="form-control taskText" id="${dataHour}text" rows="3"></textarea></td>`
        );
        // Create a column with a save button along with dataHour
        var save = $(
            `<td class="align-middle"><i class="far fa-save fa-3x saveBtn" data-hour="${dataHour}"></i></td>`
        );
        // Append the newly created table data to the table row
        tRow.append(hourRow, task, save);
        // Append the table row to the table body
        $('tbody').append(tRow);
    }

    //---------------
    // Add content of text area to local storage on save, and display
    //---------------
    // Index the textareas in the html, and assigns local storage values
    init();
    function init() {
        for (var k = 9; k < 18; k++) {
            // Populates textareas with existing local storage
            $('#' + k + 'text').val(localStorage.getItem(k));
        }
    }

    // Event listener on save button
    $('.saveBtn').click(function (e) {
        e.preventDefault();
        // Identifies what row is being saved to local storage
        var id = $(this).data('hour');
        // Saves the row and todo item into local storage
        let task = {
            hour: $(this).data('hour'),
            message: $('#' + id + 'text').val(),
        };
        localStorage.setItem(task.hour, task.message);
    });

    //---------------
    // Color code the hour blocks based on time of day and whether is in past, present, or future
    //---------------
    // Loop across each row of the table, starting at 9 (for 9am)
    for (var j = 9; j < 18; j++) {
        // If the current hour is less than the loop iteration value (starting at 9), make the background one color
        if (currentHour > j) {
            $('.hourColor')
                .eq(j - 9)
                .css('background-color', '#d3d3d3');
        }
        // If the current hour is equal to the loop iteration value (starting at 9), make the background another color
        if (currentHour === j) {
            $('.hourColor')
                .eq(j - 9)
                .css('background-color', '#ff6961');
        }
        // If the current hour is more than the loop iteration value (starting at 9), make the background a third color
        if (currentHour < j) {
            $('.hourColor')
                .eq(j - 9)
                .css('background-color', '#77dd77');
        }
    }
});

