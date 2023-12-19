(function ($) {
    $(document).on('ready', function () {
        $(document).on('click', '.stm-elementor-panel-heading', function(){
			if($(this).parent('.stm-elementor-panel').hasClass('active')) {
				return false;
			}

			$(this).parent('.stm-elementor-panel').siblings().removeClass('active');
			$(this).parent('.stm-elementor-panel').addClass('active');

			$(this).parent('.stm-elementor-panel').siblings().find('.stm-elementor-panel-body').slideUp();
			$(this).parent('.stm-elementor-panel').find('.stm-elementor-panel-body').slideDown();
		});
    });
})(jQuery);