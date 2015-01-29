var UI = {
	settings: {
		templateSettings: {
		  	interpolate: /\{\{(.+?)\}\}/g
		}
	}
};


UI.ClickOutside = function(options){
	var _this = this,
		id = _.uniqueId('UIClickOutside_');

	this.options = $.extend({
		$element: '', 
		onClickOutside: function($target){
			
		}
	}, options);
 
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


UI.Animate = function(options){
	var _this = this,
		methods = {};

	this.options = $.extend({
		$element: '',
		animationDuration: 300
	}, options);

	methods.fadeIn = function(done){
		_this.options.$element.transition({
			opacity: 1
		}, _this.options.animationDuration);

		done();
	};

	methods.fadeOut = function(done){
		_this.options.$element.transition({
			opacity: 0
		}, _this.options.animationDuration);

		done();
	};

	methods.appear = function(done){
		_this.options.$element.transition({
			scale: 0,
			opacity: 1,
			perspective: '1500px',
			rotateX: '-90deg'
		}, 0);

		setTimeout(function(){
			_this.options.$element.transition({
				scale: 1,
				opacity: 1,
				rotateX: '0deg'
			}, _this.options.animationDuration, 'easeOutBack');

			done();
		}, 50);
	};

	methods.disappear = function(done){
		_this.options.$element.transition({
			scale: 0,
			opacity: 1,
			rotateX: '90deg'
		}, _this.options.animationDuration, 'easeInBack');		

		done();
	};

	this.play = function(method, done){
		if(methods[method]){
			methods[method](function(){
				setTimeout(function(){
					if(done) done();
				}, _this.options.animationDuration);
			});
		}else{
			console.error('UI.Animate', 'Animation method not defined', method);
		}
	};
};


UI.Template = function(templateName){
	var _this = this;

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

	var $items = $(this.options.selector).find('>a');

	$items.each(function(){
		$(this).data('originalContent', $(this).html());
	});

	$items.off('click.UIChecker').on('click.UIChecker', function(e){
        e.preventDefault();

        var activeClass = '';

        if($(this).data('activeClass')){
            activeClass = ' ' + $(this).data('activeClass');
        }

        if($(this).data('toggledContent')){
	        if($(this).data('toggledContent') != $(this).html()){
				$(this).html($(this).data('toggledContent'));
			}else{
				$(this).html($(this).data('originalContent'));
			}
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
		animateOverlay,
		messageShowed = false,
		messageTimeout = null,
		waitingTimeout = null;

	this.$popup = null;
    this.state = 'idle';
    
	this.options = $.extend({
        width: 400,
        animationDuration: 400,
		onShow: function(instance){

		},
		onHide: function(instance){

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

    this.showMessage = function(type, timeout, content){
    	this.hideMessage(function(){
    		var template = new UI.Template('template-ui-popup-message'),
	        	className = '';

	        switch(type){
	            case 'error' : className = 'error'; break;
	            case 'success' : className = 'success'; break;
	            default : className = ''; break;
	        }

	        var html = template.render({
	            className: className,
	            content: content
	        });

	        if(_this.$popup){
	            _this.$popup
	            	.find('.messages')
	            	.html(html)
	            	.transition({
						height: _this.$popup.find('.messages > .message').outerHeight()
					}, 300, 'easeOutQuad');

				setTimeout(function(){
					if(timeout > 0){
						messageTimeout = setTimeout(function(){
							_this.hideMessage();
						}, timeout);
					}
				}, 300);
	        }

	        messageShowed = true;
    	});
    };

    this.hideMessage = function(done){
    	clearTimeout(messageTimeout);
    	
    	if(messageShowed){
	    	this.$popup
	    		.find('.messages')
	    		.transition({
					height: 0
				}, 200, 'easeOutQuad');

			setTimeout(function(){
				messageShowed = false;
				_this.$popup.find('.messages').empty();
				if(done) done();				
			}, 200);
		}else{
			messageShowed = false;
			if(done) done();
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

    this.setWaitingMode = function(timeout, done){
    	clearTimeout(waitingTimeout);

        this.state = 'waiting';

        if(_this.$popup){
            _this.$popup.find('.window').addClass('wait');

            if(timeout > 0){
            	waitingTimeout = setTimeout(function(){
            		_this.removeWaitingMode();
            		if(done) done();
            	}, timeout);
            }
        }
    };

    this.removeWaitingMode = function(){
    	clearTimeout(waitingTimeout);

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

    	animateWindow = new UI.Animate({
    		$element: this.$popup.find('.window'), 
    		animationDuration: this.options.animationDuration
    	});

    	animateOverlay = new UI.Animate({
    		$element: this.$popup.find('.overlay'), 
    		animationDuration: this.options.animationDuration
    	});

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