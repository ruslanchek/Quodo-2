var UI = {
	settings: {
		templateSettings: {
		  	interpolate: /\{\{(.+?)\}\}/g
		}
	}
};

UI.Template = function(templateName){
	_.templateSettings = this.settings.templateSettings;

	var getTemplate = function(){
		var template = $('#' + templateName).html();

		if(template){
			return template;
		}else{
			console.error('UI.Template', 'Template is empty!');
		}
	};

	this.render = function(data){
		var template = _.template(getTemplate());

		return template(data);
	};
};

UI.Checker = function(options){
	var _this = this;

	this.options = $.extend({
		selector: '.checker', 
		onCheck: function($checker){

		}, 
		onUncheck: function($checker){

		}
	}, options);

	$(this.options.selector).find('>a').off('click.UIChecker').on('click.UIChecker', function(e){
        e.preventDefault();

        var activeClass = '';

        if($(this).data('activeClass')){
            activeClass = ' ' + $(this).data('activeClass');
        }

		if($(this).hasClass('active')){
			$(this).removeClass('active' + activeClass);
			_this.options.onUncheck($(this));
		}else{
			$(this).addClass('active' + activeClass);
			_this.options.onCheck($(this));
		}
	});
};

UI.Popup = function(options){
	var _this = this;

	this.$popup = null;

	this.options = $.extend({
		templateSelector: '#template-ui-popup',
		onShow: function(){

		},
		onHide: function(){

		}
	}, options);

	var bind = function(){
		unbind();

		if(_this.$popup){
			$popup.find('close').on('click', function(e){
				e.preventDefault();

				_this.hide();
			});
		}

		$(document).on('keyup.UIPopup', function(e){
			switch(e.keyCode){
				case 13 : {
					_this.hide();
				} break;
			}
		});
	};

	var unbind = function(){
		$(document).off('keyup.UIPopup');
	};

	var template = new UI.Template(_this.options.templateSelector);

	var make = function(title, content){
		return template.render({
			title: title,
			content: content
		});
	};

	this.changeContent = function(html){
		if(this.$popup){
			this.$popup.find('.content').html(html);
		}
	};

	this.changeTitle = function(html){
		if(this.$popup){
			this.$popup.find('.title').html(html);
		}
	};

	this.show = function(title, content){
		this.hide();

		var html = make(title, content);

		this.$popup = $(html);

		$('body').append(html);
		this.options.onShow();

		bind();
	};

	this.hide = function(){
		unbind();
		this.options.onHide();
	};
};