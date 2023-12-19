(function ($) {
    $(document).on('ready', function () {
        $(document).on('click', '.elementor-contact-tab', function(){
			if($(this).hasClass('active')) {
				return false;
			}

			let id = $(this).data('tab');
			$('.contact-panel-' + id ).siblings().removeClass('active');
			$('.contact-panel-' + id ).addClass('active');

			$(this).parent('.elementor-contact-tabs-list').find('li').removeClass('active');
			$(this).addClass('active');
		});
    });
})(jQuery);
