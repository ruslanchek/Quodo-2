// hljs.initHighlightingOnLoad();

var Demo = {};

Demo.Table = function(){
	this.initChecker = function(){
		var checker = new UI.Checker('#table-checkers', 
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

Demo.init = function(){
	this.Table = new this.Table().init();
};

$(function(){
	Demo.init();
});