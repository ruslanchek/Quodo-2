var UI = {};

UI.Checker = function(selector, check, uncheck){
	var $checker = $(selector);

	$checker.find('>a').off('click.UIChecker').on('click.UIChecker', function(e){
        e.preventDefault();

        var activeClass = '';

        if($(this).data('activeClass')){
            activeClass = ' ' + $(this).data('activeClass');
        }

		if($(this).hasClass('active')){
			$(this).removeClass('active' + activeClass);
			if(uncheck) uncheck($(this));
		}else{
			$(this).addClass('active' + activeClass);
			if(check) check($(this));
		}
	});
};