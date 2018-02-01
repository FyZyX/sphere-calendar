$(function () {
	'use strict';
	
	if (!("ontouchstart" in document.documentElement)) {
		$('.time').on('click', function () {
			$('#range-overlay').css({'display': 'flex'});
		});

		$('#range-cancel').click(function () {
			$('#range-overlay').css({'display': 'none'});
		});
	}
});