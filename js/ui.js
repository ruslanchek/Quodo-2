var UI = {};

UI.Checker = function(selector, check, uncheck){
	var $checker = $(selector);

	$checker.find('>a').off('click.UIChecker').on('click.UIChecker', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			if(uncheck) uncheck($(this));
		}else{
			$(this).addClass('active');
			if(check) check($(this));
		}
	});
};