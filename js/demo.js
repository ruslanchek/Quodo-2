// hljs.initHighlightingOnLoad();

var Demo = {};

Demo.Table = function(){
	this.initChecker = function(){
		var checker = new UI.Checker({
			selector: '#table-checker',
			onCheck: function($checker){
				$('#table-sample').addClass($checker.data('type'));
			}, 
			onUncheck: function($checker){
				$('#table-sample').removeClass($checker.data('type'));
			}
		});
	};

	this.init = function(){
		this.initChecker();

        return this;
	};
};

Demo.Checker = function(){
    this.initChecker = function(){
        var checker = new UI.Checker({
        	selector: '#sample-checker'
        });
    };

    this.init = function(){
        this.initChecker();

        return this;
    };
};

Demo.Popup = function(){
    var _this = this;

    this.initPopup1 = function(){
        var content = new UI.Template('template-demo-popup-1-content').render();

        this.samplePopup1 = new UI.Popup({
            width: 500,
            onShow: function(instance){
                var checker = new UI.Checker({
                    selector: '#popup-sample-waiting-checker',
                    onCheck: function(){
                        instance.setWaitingMode(2000, function(){
                        	$('#popup-sample-waiting-checker a').click();
                        });
                    },
                    onUncheck: function(){
                        instance.removeWaitingMode();
                    }
                });
            }
        });

        $('#show-sample-popup-1').on('click', function(e){
            e.preventDefault();
            _this.samplePopup1.show('Waiting mode', content);
        });
    };

    this.initPopup2 = function(){
        var content = new UI.Template('template-demo-popup-2-content').render();

        this.samplePopup2 = new UI.Popup({
            width: 500,
            onShow: function(instance){
                $('#popup-sample-messages-error').on('click', function(){
                    instance.showMessage('error', 5000, 'Here is your error message! <span class="text-fade">Will disappear in 5 seconds.</span>')
                });

                $('#popup-sample-messages-success').on('click', function(){
                    instance.showMessage('success', 5000, 'Here is your success message! <span class="text-fade">Will disappear in 5 seconds.</span>')
                });
            }
        });

        $('#show-sample-popup-2').on('click', function(e){
            e.preventDefault();
            _this.samplePopup2.show('Messages system', content);
        });
    };

    this.init = function(){
        this.initPopup1();
        this.initPopup2();

        return this;
    };
};

Demo.init = function(){
	this.table = new this.Table().init();
	this.checker = new this.Checker().init();
    this.popup = new this.Popup().init();
};

$(function(){
	Demo.init();
});
