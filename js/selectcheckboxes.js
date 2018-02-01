$(function () {
	'use strict';
	$('.time').on('touchstart', function () {
		$('#range-overlay').css({'display': 'initial'});
	});
	$('#range-menu input[type=button]').click(function () {
		$('#range-overlay').css({'display': 'none'});
	});
});