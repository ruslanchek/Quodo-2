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


Demo.init = function(){
	this.table = new this.Table().init();
	this.checker = new this.Checker().init();
};

$(function(){
	Demo.init();
});