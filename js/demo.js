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
        this.samplePopup1 = new UI.Popup({
            width: 500,
            onShow: function(instance){
                $('#popup-sample-waiting-toggler').on('click', function(){
                    if(instance.state == 'waiting') {
                        instance.removeWaitingMode();
                    }else{
                        instance.setWaitingMode();
                    }
                });
            }
        });

        $('#show-sample-popup-1').on('click', function(e){
            e.preventDefault();
            _this.samplePopup1.show('Waiting mode popup', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua<br><br><button id="popup-sample-waiting-toggler" class="button bg-aqua-dark volume fat">Toggle waiting mode</button>');
        });
    };

    this.initPopup2 = function(){
        this.samplePopup2 = new UI.Popup({
            width: 500,
            onShow: function(instance){
                $('#popup-sample-messages-error').on('click', function(){
                    instance.showMessage('error', 1000, 'Here is your error message!')
                });

                $('#popup-sample-messages-success').on('click', function(){
                    instance.showMessage('success', 1000, 'Here is your success message!')
                });
            }
        });

        $('#show-sample-popup-2').on('click', function(e){
            e.preventDefault();
            _this.samplePopup2.show('Messages system', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua<br><br><button id="popup-sample-messages-error" class="button bg-bittersweet-dark volume fat">Show error message</button><button id="popup-sample-messages-success" class="button bg-mint-dark volume fat">Show success message</button>');
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