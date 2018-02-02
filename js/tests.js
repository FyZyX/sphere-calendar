QUnit.module("conversion tests", {
	beforeEach: initialDate
});

QUnit.test("test 12 hour to 24 hour", function(assert) {
	assert.equal(to24Hour(8, 'am'), 8);
	assert.equal(to24Hour(8, 'pm'), 20);
	
	// edge cases: midnight and noon
	assert.equal(to24Hour(12, 'am'), 0);
	assert.equal(to24Hour(12, 'pm'), 12);
});

QUnit.test("test 24 hour to 12 hour", function(assert) {
	assert.deepEqual(to12Hour(8), {hours: 8, cycle: 'am'});
	assert.deepEqual(to12Hour(20), {hours: 8, cycle: 'pm'});
	
	// edge cases: midnight and noon
	assert.deepEqual(to12Hour(0), {hours: 12, cycle: 'am'});
	assert.deepEqual(to12Hour(12), {hours: 12, cycle: 'pm'});
});

QUnit.test("test minutes to string", function(assert) {
	assert.equal(minutesToString(0), '');
	assert.equal(minutesToString(30), '30');
});

QUnit.test("test string to minutes", function(assert) {
	assert.equal(stringToMinutes(''), 0);
	assert.equal(stringToMinutes('30'), 30);
});

QUnit.test("test date to id", function(assert) {
	assert.equal(dateToId(this.date), 'sun12am');
	
	var newDate = this.date;
	newDate.setDate(29 + 6);
	newDate.setHours(8);
	newDate.setMinutes(30);
	assert.equal(dateToId(newDate), 'sat830am');
	
	newDate.setDate(2);
	newDate.setHours(20);
	newDate.setMinutes(0);
	assert.equal(dateToId(newDate), 'thu8pm');
	
	newDate.setDate(1);
	newDate.setHours(20);
	newDate.setMinutes(30);
	assert.equal(dateToId(newDate), 'wed830pm');
});

QUnit.test("test id to date", function(assert) {
	assert.deepEqual(idToDate('sun12am'), this.date);
	
	var newDate = this.date;
	newDate.setDate(newDate.getDate() + 6);
	newDate.setHours(8);
	newDate.setMinutes(30);
	assert.deepEqual(idToDate('sat830am'), newDate);
	
	newDate.setDate(2);
	newDate.setHours(20);
	newDate.setMinutes(0);
	assert.deepEqual(idToDate('thu8pm'), newDate);
	
	newDate.setDate(1);
	newDate.setHours(20);
	newDate.setMinutes(30);
	assert.deepEqual(idToDate('wed830pm'), newDate);
});

QUnit.module("utility tests", {
	beforeEach: initialDate
});

QUnit.test("test generate date", function(assert) {
	assert.deepEqual(generateDate('sun', '12', '', 'am'), this.date);
	
	var newDate = this.date;
	newDate.setDate(newDate.getDate() + 6);
	newDate.setHours(8);
	newDate.setMinutes(30);
	assert.deepEqual(generateDate('sat', '8', '30', 'am'), newDate);
	
	newDate.setDate(2);
	newDate.setHours(20);
	newDate.setMinutes(0);
	assert.deepEqual(generateDate('thu', '8', '', 'pm'), newDate);
	
	newDate.setDate(1);
	newDate.setHours(20);
	newDate.setMinutes(30);
	assert.deepEqual(generateDate('wed', '8', '30', 'pm'), newDate);
});

QUnit.test("test add half-hour", function(assert) {
	var newDate = addHalfHour(this.date);
	this.date.setMinutes(30);
	assert.deepEqual(this.date, newDate);
});

interpolateTimes
QUnit.test("test add half-hour", function(assert) {
	var endTime = new Date();
	endTime.setFullYear(2018, 6, 29);
	endTime.setHours(1);
	endTime.setMinutes(0);
	endTime.setSeconds(0);
	endTime.setMilliseconds(0);
	
	var times = interpolateTimes(this.date, endTime);
	assert.equal(times.length, 2);
	assert.ok(times.indexOf(this.date) !== -1, times.indexOf(endTime) === -1)
});

function initialDate() {
	this.date = new Date();
	this.date.setFullYear(2018, 6, 29);  // Sunday
	this.date.setHours(0);
	this.date.setMinutes(0);
	this.date.setSeconds(0);
	this.date.setMilliseconds(0);
}
