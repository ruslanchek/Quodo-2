var UI = {
	settings: {
		templateSettings: {
		  	interpolate: /\{\{(.+?)\}\}/g
		}
	}
};

UI.Template = function(templateName){
	_.templateSettings = UI.settings.templateSettings;

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
		templateName: 'template-ui-popup',
		onShow: function(){

		},
		onHide: function(){

		}
	}, options);

	var bind = function(){
		unbind();

		if(_this.$popup){
			_this.$popup.find('.close').on('click', function(e){
				e.preventDefault();

				_this.hide();
			});
		}

        $(window).on('resize.UIPopup', function(){
            resize();
        });

		$(document).on('keyup.UIPopup', function(e){
			switch(e.keyCode){
				case 27 : {
					_this.hide();
				} break;
			}
		});
	};

    var template = new UI.Template(_this.options.templateName);

	var unbind = function(){
		$(document).off('keyup.UIPopup');
	};

	var make = function(title, content){
		return template.render({
			title: title,
			content: content
		});
	};

    var resize = function(){
        if(_this.$popup){
            var height = _this.$popup.find('.popup').outerHeight(),
                width = _this.$popup.find('.popup').outerWidth();

            _this.$popup.find('.popup').css({
                marginTop: -height/2,
                marginLeft: -width/2
            });
        }
    };

	this.changeContent = function(html){
		if(this.$popup){
			this.$popup.find('.content').html(html);
            resize();
        }
	};

	this.changeTitle = function(html){
		if(this.$popup){
			this.$popup.find('.title').html(html);
            resize();
        }
	};

	this.show = function(title, content){
		this.hide();

		this.$popup = $(make(title, content));

		$('body').append(this.$popup);
		this.options.onShow();

		bind();
        resize();
	};

	this.hide = function(){
		unbind();

		if(this.$popup){
			this.$popup.remove();
		}

		this.options.onHide();
	};
};