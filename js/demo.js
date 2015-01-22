// hljs.initHighlightingOnLoad();

var Demo = {};

Demo.Table = function(){
	this.initChecker = function(){
		var checker = new UI.Checker('#table-checker',
			function($checker){
				$('#table-sample').addClass($checker.data('type'));
			}, 
			function($checker){
				$('#table-sample').removeClass($checker.data('type'));
			}
		);
	};

	this.init = function(){
		this.initChecker();
	};
};

Demo.Checker = function(){
    this.initChecker = function(){
        var checker = new UI.Checker('#sample-checker',
            function($checker){

            },
            function($checker){

            }
        );
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