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
        width: 400,
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

	var unbind = function(){
		$(document).off('keyup.UIPopup');
	};

	var make = function(title, content){
        var template = new UI.Template('template-ui-popup');

		return template.render({
			title: title,
			content: content
		});
	};

    var resize = function(){
        if(_this.$popup){
            var height = _this.$popup.find('.popup').outerHeight();

            _this.$popup.find('.popup').css({
                width: _this.options.width,
                marginTop: -height/2,
                marginLeft: -_this.options.width/2
            });
        }
    };

    this.showMessage = function(text, type){
        var template = new UI.Template('template-ui-popup-message');

        var className = '';

        switch(type){
            case 'error' : className = 'bg-bittersweet-dark'; break;
            case 'ok' : className = 'bg-mint-dark'; break;
            default : className = 'bg-medium-gray-dark'; break;
        }

        var html = template.render({
            className: className,
            text: text
        });

        if(_this.$popup){
            _this.$popup.find('.messages').html(html);
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

    this.setWaitingMode = function(){
        if(_this.$popup){
            _this.$popup.find('.popup').addClass('wait');
        }
    };

    this.removeWaitingMode = function(){
        if(_this.$popup){
            _this.$popup.find('.popup').removeClass('wait');
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