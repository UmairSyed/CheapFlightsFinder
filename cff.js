
$(document).ready(function () {
	
	$(".half-dk").halfDropkick();

	$(".deal-type").click(function () {
		var isOn = $(this).hasClass('on');
		$('.deal-type').removeClass('on');
		//$('.deal-class').removeClass('on');
		if (!isOn)
			$(this).addClass('on');
		toggleDeals();
	});

	$(".deal-class").click(function () {
		var isOn = $(this).hasClass('on');
		$('.deal-class').removeClass('on');
		if (!isOn)
			$(this).addClass('on');
		toggleDeals();
	});

	$(".btn-finder").click(function () {
		var buttonId = $(this).attr('id');
		var selectValue = $('.' + buttonId).val();
		if (selectValue != "") {
			window.location.href = selectValue;
		}
	});

	if ($('html').hasClass('csstransforms3d')) {
		$('.thumb').removeClass('scroll').addClass('flip');

		$('.thumb.flip').hover(
			function () {
				$(this).find('.thumb-detail').css("visibility", "visible");
				$(this).find('.thumb-wrapper').addClass('flipIt');
			},
			function () {
				$(this).find('.thumb-wrapper').removeClass('flipIt');
			}
		);

	} else {
		$('.thumb .thumb-detail, .thumb .thumb-detail span').css("opacity", 0).css("visibility", "visible");
		$('.thumb').hover(
			function () {
				$(this).find('.thumb-detail, .thumb-detail span').stop().fadeTo(400, 1, 'easeOutCubic');
			},
			function () {

				$(this).find('.thumb-detail, .thumb-detail span').stop().fadeTo(400, 0, 'easeOutCubic');
			}
		);

	}
});

function toggleDeals() {

	var activeTypeId = $('.deal-type.on').attr('id');
	var activeClassId = $('.deal-class.on').attr('id');

	$(".thumb.grid-item").hide();
	var dealsToShow = $(".flip-front .deal-item");
	if (activeTypeId) {
		dealsToShow = dealsToShow.filter("." + activeTypeId);
	}
	if (activeClassId) {
		dealsToShow = dealsToShow.filter("." + activeClassId);
	}
	if (!activeClassId && !activeTypeId)
		dealsToShow = dealsToShow.filter(".deal-default");

	dealsToShow.each(function (index) {
		if (index < 9)
			$(this).parents(".thumb.grid-item:first").show();
		else
			return false;
	});

	$(".no-deals").toggle(dealsToShow.length <= 0);

	var ddl = $("#ddl-destinations");
	var selectedDestination = ddl.val();
	ddl.empty();

	$.each(destinationList, function () {
		if (!this.value || !activeTypeId || (activeTypeId == "deal-domestic" && !this.isInternational) || (activeTypeId == "deal-international" && this.isInternational))
		   $("<option />").val(this.value).html(this.text).appendTo(ddl);
	});
	ddl.val(selectedDestination).trigger("change");
}

var destinationList = $("#ddl-destinations option").map(function () {
	var $this = $(this);
	return {
		text: $this.html(),
		value: $this.val(),
		isInternational: $this.hasClass("deal-international")
	};
});
