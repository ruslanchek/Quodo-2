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
    };
};

Demo.Popup = function(){
    this.initPopup = function(){
        var samplePopup = new UI.Popup({

        });

        $('#show-sample-popup').on('click', function(){
            samplePopup.show('Header', 'Content');
        });
    };

    this.init = function(){
        this.initPopup();
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