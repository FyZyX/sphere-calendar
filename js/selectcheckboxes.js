var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/* ====== BEGIN DOCUMENT READY FUNCTION ====== */

$(function() {
	if (true) { // isTouchDevice()
		// show range selection menu when a time slot is clicked
		$('.time').click(function () {
			// extract the id from the slected element and convert it to a Date object
			var id = this.children[0].id;
			var time = idToDate(id);
			
			// attach initial selection to overaly for detection by cancel/submit buttons
			$('#range-overlay')[0].selectedTimeSlot = id;
			
			showMenu();
			
			// update the start time to the selected time
			// update the end time to next block after the selected time
			setRangeTime("start", time);
			setRangeTime("end", addHalfHour(time));
		});

		// click cancel button
		$('#range-cancel').click(function () {
			deselectInitialSlot();
			
			// dismiss range selection menu
			hideMenu();
		});

		// click select button
		$('#range-select').click(function () {
			deselectInitialSlot();
			
			// extract start and end times from range selection menu
			var startTime = parseTime($('#range-start .date-selector').children());
			var endTime = parseTime($('#range-end .date-selector').children());
			
			// select all time slots in the given range
			interpolateTimes(startTime, endTime).map(function(time) {
				return $('#' + dateToId(time)).prop('checked', true);
			});
			
			// dismiss range selection menu
			hideMenu();
		});
	}
});

/* ====== END DOCUMENT READY FUNCTION ====== */

/* ====== BEGIN UTILITY FUNCTIONS ====== */

function generateDate(day, time, halfHour, cycle) {
	var date = new Date();
	// 6/29/2018 is a Sunday, so offset accordingly
	date.setFullYear(2018, 6, 29 + days.indexOf(day));
	// set the hours and minutes appropriately
	date.setHours(to24Hour(parseInt(time), cycle));
	date.setMinutes(stringToMinutes(halfHour));
	// zero out seconds and milliseconds
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
}

function parseTime(dateArray) {
	// map the HTML components to their respective values
	var components = [];
	dateArray.each(function() {
		components.push(this.value);
	});
	
	// deconstruct components
	var day = components[0],
		time = components[1],
		halfHour = components[2],
		cycle = components[3];
	
	return generateDate(day, time, halfHour, cycle);
}

function addHalfHour(date) {
	return new Date(date.getTime() + 30*60000);
}

function interpolateTimes(startTime, endTime) {
	// swap dates if start is later than end
	if (startTime > endTime) {
		var temp = startTime;
		startTime = endTime;
		endTime = temp;
	}
	
	// collect a list of all time blocks in the semi-open interval [startTime, endTime)
	var times = [];
	var currentTime = startTime;
	while (currentTime < endTime) {
		times.push(currentTime);
		currentTime = addHalfHour(currentTime);
	}
	return times;
}

function deselectInitialSlot() {
	// deselect inital time slot
	var selectedId = $('#range-overlay')[0].selectedTimeSlot;
	$('#' + selectedId).prop('checked', false);
}

function showMenu() {
	$('#range-overlay').css({'display': 'flex'});
}

function hideMenu() {
	$('#range-overlay').css({'display': 'none'});
}

/* ====== END UTILITY FUNCTIONS ====== */

/* ====== BEGIN CONVERSION FUNCTIONS ====== */

function to24Hour(hours, cycle) {
	// e.g. 6 pm -> 18:00
	
	// handle edge cases: midnight and noon
	if (hours === 12) {
		return cycle === 'am' ? 0 : 12;
	}
	
	return cycle === 'am' ? hours : hours + 12;
}

function to12Hour(hours) {
	// e.g. 18:00 -> 6 pm
	if (hours === 0) { // handle edge case: midnight
		return {
			'hours': 12,
			'cycle': 'am'
		};
	} else if (hours === 12) { // handle edge case: noon
		return {
			'hours': hours,
			'cycle': 'pm'
		};
	} else {
		return {
			'hours': hours % 12,
			'cycle': (hours < 12 ? 'am' : 'pm')
		};
	}
}

function minutesToString(minutes) {
	return minutes === 30 ? "30" : '';
}

function stringToMinutes(minuteString) {
	return minuteString.length > 0 ? 30 : 0;
}

function dateToId(date) {
	var time = to12Hour(date.getHours());
	return days[date.getDay()] + time.hours + minutesToString(date.getMinutes()) + time.cycle;
}

function idToDate(id) {
	var day = id.slice(0, 3),
		time = id.slice(3, -2),
		halfHour = '',
		cycle = id.slice(-2);
	
	// any half-hour id will contain either 3 or 4 numbers
	if (time.length > 2) {
		// split time string into hours and minutes
		halfHour = time.slice(-2);
		time = parseInt(time.slice(0, -2));
	} else {
		time = parseInt(time);
	}
	
	return generateDate(day, time, halfHour, cycle);
}

/* ====== END CONVERSION FUNCTIONS ====== */

/* ====== BEGIN UI UPDATE FUNCTIONS ====== */

function setRangeTime(selector, time) {
	// get <select> tags and attach appropriate values from click event
	var components = $('#range-' + selector + ' .date-selector').children();
	var hours = to12Hour(time.getHours());
	components[0].value = days[time.getDay()];
	components[1].value = hours.hours;
	components[2].value = minutesToString(time.getMinutes());
	components[3].value = hours.cycle;
}

/* ====== END UI UPDATE FUNCTIONS ====== */
