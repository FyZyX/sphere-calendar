if (!isTouchDevice()) {
	document.documentElement.className += " no-touch";
}

function isTouchDevice() {
	return "ontouchstart" in document.documentElement;
}
