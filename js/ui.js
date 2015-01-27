var UI = {
	settings: {
		templateSettings: {
		  	interpolate: /\{\{(.+?)\}\}/g
		}
	}
};

UI.ClickOutside = function($container, onClickOutside){
	var id = _.uniqueId('UIClickOutside_');
 
	this.bind = function(){
		this.unbind();
		
		$(document).on('mouseup.' + _id, function (e){
			if (!$container.is(e.target) && $container.has(e.target).length === 0){
			    if(onClickOutside) onClickOutside(e.target);
			}
		});
	};
 
	this.unbind = function(){
		$(document).off('mouseup.' + _id);
	};
};

UI.Animate = function($element, duration){
	var methods = {};

	methods.fadeIn = function(done){
		$element.transition({
			opacity: 1
		}, duration);

		done();
	};

	methods.fadeOut = function(done){
		$element.transition({
			opacity: 0
		}, duration);

		done();
	};

	methods.appear = function(done){
		$element.transition({
			scale: 0,
			opacity: 1,
			perspective: '1500px',
			rotateX: '-90deg'
		}, 0);

		setTimeout(function(){
			$element.transition({
				scale: 1,
				opacity: 1,
				rotateX: '0deg'
			}, duration, 'easeOutBack');

			done();
		}, 50);
	};

	methods.disappear = function(done){
		$element.transition({
			scale: 0,
			opacity: 1,
			rotateX: '90deg'
		}, duration, 'easeInBack');		

		done();
	};

	this.play = function(method, done){
		if(methods[method]){
			methods[method](function(){
				setTimeout(function(){
					if(done) done();
				}, duration);
			});
		}else{
			console.error('UI.Animate', 'Animation method not defined', method);
		}
	};
};

UI.Template = function(templateName){
	_.templateSettings = UI.settings.templateSettings;

	var getTemplate = function(){
		var template = $('#' + templateName).html();

		if(template){
			return template;
		}else{
			console.error('UI.Template', 'Template is empty', templateName);
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
	var _this = this,
		animateWindow,
		animateOverlay;

	this.$popup = null;
    this.state = 'idle'; // @TODO: Add all the other states 
    
	this.options = $.extend({
        width: 400,
        animationDuration: 500,
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
            var height = _this.$popup.find('.window').outerHeight();

            _this.$popup.find('.window').css({
                width: _this.options.width,
                marginTop: -height/2,
                marginLeft: -_this.options.width/2
            });
        }
    };

    this.showMessage = function(text, type){
        var template = new UI.Template('template-ui-popup-message'),
        	className = '';

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
        this.state = 'waiting';

        if(_this.$popup){
            _this.$popup.find('.window').addClass('wait');
        }
    };

    this.removeWaitingMode = function(){
        this.state = 'idle';

        if(_this.$popup){
            _this.$popup.find('.window').removeClass('wait');
        }
    };

	this.show = function(title, content){
		this.hide();

		this.$popup = $(make(title, content));

		$('body').append(this.$popup);

		resize();

    	animateWindow = new UI.Animate(this.$popup.find('.window'), this.options.animationDuration);
    	animateOverlay = new UI.Animate(this.$popup.find('.overlay'), this.options.animationDuration);

		animateOverlay.play('fadeIn');

		animateWindow.play('appear', function(){
			bind();
    		_this.options.onShow(_this);
		});
	};

	this.hide = function(){
		if(this.$popup){
			animateOverlay.play('fadeOut');

			animateWindow.play('disappear', function(){
				unbind();

				_this.$popup.remove();
				_this.options.onHide(_this);
				
				_this.$popup = null;
				animateWindow = null;
				animateOverlay = null;
			});
		}
	};
};