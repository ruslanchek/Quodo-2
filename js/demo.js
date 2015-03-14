hljs.initHighlightingOnLoad();

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

    this.initPopup3 = function(){
        var content = new UI.Template('template-demo-popup-3-content').render();

        this.samplePopup3 = new UI.Popup({
            width: 500,
            overlay: false,
            modal: false,
            onShow: function(instance){
                $('#popup-sample-messages-error').on('click', function(){
                    instance.showMessage('error', 5000, 'Here is your error message! <span class="text-fade">Will disappear in 5 seconds.</span>')
                });

                $('#popup-sample-messages-success').on('click', function(){
                    instance.showMessage('success', 5000, 'Here is your success message! <span class="text-fade">Will disappear in 5 seconds.</span>')
                });
            }
        });

        $('#show-sample-popup-3').on('click', function(e){
            e.preventDefault();
            _this.samplePopup3.show('Not modal', content);
        });
    };

    this.initPopup4 = function(){
        var content = new UI.Template('template-demo-popup-4-content').render();

        this.samplePopup4 = new UI.Popup({
            width: 500,
            overlay: true,
            modal: true,
            onBeforeShow: function(instance){
                var tabs = new UI.Tabs({
                    tabsSelector: '#tabs-popup',
                    tabsContentSelector: '#tabs-popup-content',
                    sliding: true
                });

                $('#tabs-popup-content .tab-trigger').on('click', function(e){
                    e.preventDefault();
                    tabs.openTab($(this).data('name'));
                });
            },
            onShow: function(instance){
                
            }
        });

        $('#tabs-popup-trigger').on('click', function(e){
            e.preventDefault();
            _this.samplePopup4.show('Tabs are inside', content);
        });
    };

    this.init = function(){
        this.initPopup1();
        this.initPopup2();
        this.initPopup3();
        this.initPopup4();

        return this;
    };
};

Demo.Tabs = function(){
    var _this = this;

    this.initTabs = function(){
        this.sampleTabs = new UI.Tabs({
            tabsSelector: '#tabs',
            tabsContentSelector: '#tabs-content',
            sliding: true
        });

        $('#tabs-content .tab-trigger').on('click', function(e){
            e.preventDefault();
            _this.sampleTabs.openTab($(this).data('name'));
        });
    };

    this.init = function(){
        this.initTabs();

        return this;
    };
};

Demo.Fullscreen = function(){
    var _this = this;

    this.initFullscreen = function(){
        this.sampleFullscreen = new UI.Fullscreen();

        $('#fullscreen-demo-1').on('click', function(e){
            e.preventDefault();

            _this.sampleFullscreen.prepare();
            _this.sampleFullscreen.render({
                title: 'Fullscreen demo 1',
                subtitle: 'Simple photo demo',
                content: '<img width="100%" src="http://lorempixel.com/1200/1200/?123"/>',
                toolbar: '<div class="button-group"><a class="button wireframe bg-cold-light" href="#">Send</a><a class="button wireframe bg-heat-light" href="#">Delete</a></div>'
            });

            setTimeout(function(){ // Emulate data loading delay
                _this.sampleFullscreen.show();
            }, 1500);
        });
    };

    this.init = function(){
        this.initFullscreen();

        return this;
    };
};

Demo.init = function(){
	this.table = new this.Table().init();
	this.checker = new this.Checker().init();
    this.popup = new this.Popup().init();
    this.tabs = new this.Tabs().init();
    this.fullscreen = new this.Fullscreen().init();
};

$(function(){
	Demo.init();
});
