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
			console.error('UI.Template', 'Template ' + templateName + ' is empty!');
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
		animationTime = 300;

	this.$popup = null;
    this.waitingMode = false;

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

    var animateAppear = function(done){
    	if(_this.$popup){
    		//perspective: '100px',rotateX: '180deg'
    		var $overlay = _this.$popup,
    			$window = _this.$popup.find('.popup');

	    	$overlay.transition({
				opacity: 0
			}, 0);

			$overlay.css({
				display: 'block'
			});

			$window.transition({
				scale: 0,
				perspective: '1000px',
				rotateX: '20deg'
			}, 0);

			$window.css({
				display: 'block'
			});

			setTimeout(function(){
				$overlay.transition({
					opacity: 1
				}, animationTime);

				$window.transition({
					scale: 1,
					rotateX: '0deg'
				}, animationTime, 'easeOutBack');

				if(done) done();
			}, 50);
		}else{
			if(done) done();
		}
    };

    var animateDisappear = function(done){
    	if(_this.$popup){
			var $overlay = _this.$popup,
				$window = _this.$popup.find('.popup');

	    	$overlay.transition({
				opacity: 0
			}, animationTime);

			$window.transition({
				scale: 0,
				rotateX: '20deg'
			}, animationTime, 'easeInBack');

			setTimeout(function(){
				if(done) done();
			}, animationTime);
		}else{
			if(done) done();
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
        this.waitingMode = true;

        if(_this.$popup){
            _this.$popup.find('.popup').addClass('wait');
        }
    };

    this.removeWaitingMode = function(){
        this.waitingMode = false;

        if(_this.$popup){
            _this.$popup.find('.popup').removeClass('wait');
        }
    };

	this.show = function(title, content){
		this.hide();

		this.$popup = $(make(title, content));

		$('body').append(this.$popup);

		animateAppear(function(){
			bind();
        	resize();

        	_this.options.onShow(this);
		});
	};

	this.hide = function(){
		if(this.$popup){
			animateDisappear(function(){
				unbind();

				_this.$popup.remove();
				_this.options.onHide(this);
				_this.$popup = null;
			});
		}
	};
};