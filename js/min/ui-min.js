var UI={settings:{templateSettings:{interpolate:/\{\{(.+?)\}\}/g}}};UI.ClickOutside=function(t){var n=this,i=_.uniqueId("UIClickOutside_");this.options=$.extend({selector:"",onClickOutside:function(t){}},t),this.bind=function(){this.unbind(),$(document).on("mouseup."+i,function(t){var i=$(n.options.selector);i.is(t.target)||0!==i.has(t.target).length||n.options.onClickOutside(t.target)})},this.unbind=function(){$(document).off("mouseup."+i)}},UI.Animate=function(t){var n=this,i={};this.options=$.extend({$element:"",animationDuration:300},t);var o=this.options.$element;i.fadeIn=function(t){o.transition({opacity:1},n.options.animationDuration),t()},i.fadeOut=function(t){o.transition({opacity:0},n.options.animationDuration),t()},i.appear=function(t){o.transition({scale:0,opacity:1,perspective:"1500px",rotateX:"-90deg"},0),setTimeout(function(){o.transition({scale:1,opacity:1,rotateX:"0deg"},n.options.animationDuration,"easeOutBack"),t()},50)},i.disappear=function(t){o.transition({scale:0,opacity:1,rotateX:"90deg"},n.options.animationDuration,"easeInBack"),t()},i.slideDown=function(t){o.transition({scale:.75,opacity:0,y:"-100vh"},0),o.transition({y:"0vh",opacity:1},n.options.animationDuration,"easeOutQuad").transition({scale:1},n.options.animationDuration,"easeOutBack"),t()},i.slideUp=function(t){o.transition({scale:1,opacity:1,y:"0vh"},0),o.transition({scale:.75},n.options.animationDuration,"easeInOutBack").transition({opacity:0,y:"-100vh"},n.options.animationDuration/2,"easeInQuad"),t()},this.play=function(t,o){i[t]?i[t](function(){setTimeout(function(){o&&o()},n.options.animationDuration)}):console.error("UI.Animate","Can't find animation method",t)}},UI.Template=function(t){var n=this;_.templateSettings=UI.settings.templateSettings;var i=function(){var n=$("#"+t).html();return n?n:void console.error("UI.Template","Template is empty",t)};this.render=function(t){var n=_.template(i());return n(t)}},UI.Checker=function(t){var n=this;this.options=$.extend({selector:".checker",onCheck:function(t){},onUncheck:function(t){},onToggle:function(t,n){}},t);var i=$(this.options.selector).find(">a");i.each(function(){$(this).data("originalContent",$(this).html())}),i.off("click.UIChecker").on("click.UIChecker",function(t){t.preventDefault();var i="";$(this).data("activeClass")&&(i=" "+$(this).data("activeClass")),$(this).data("toggledContent")&&$(this).html($(this).data("toggledContent")!=$(this).html()?$(this).data("toggledContent"):$(this).data("originalContent")),$(this).hasClass("active")?($(this).removeClass("active"+i),n.options.onUncheck($(this)),n.options.onToggle(!1,$(this))):($(this).addClass("active"+i),n.options.onCheck($(this)),n.options.onToggle(!0,$(this)))})},UI.Popup=function(t){var n=this,i=_.uniqueId("UIPopup_"),o,e,s=!1,a=null,u=null,p=null;this.$popup=null,this.state="idle",this.options=$.extend({width:400,animationDuration:500,modal:!0,overlay:!0,onBeforeShow:function(){},onShow:function(t){},onHide:function(t){}},t),this.options.modal!==!0&&(p=new UI.ClickOutside({selector:".popup#"+i+" .window",onClickOutside:function(t){n.hide()}}));var c=function(){l(),n.$popup&&n.$popup.length>0&&(n.$popup.find(".close").on("click",function(t){t.preventDefault(),n.hide()}),!n.options.modal&&p&&p.bind()),$(window).on("resize."+i,function(){d()}),$(document).on("keyup."+i,function(t){switch(t.keyCode){case 27:n.hide()}})},l=function(){$(document).off("keyup."+i),$(window).off("resize."+i),n.options.modal||null===p||p.unbind()},r=function(t,o){var e=new UI.Template("template-ui-popup");return e.render({title:t,content:o,overlay:n.options.overlay?"":"no-overlay",_id:i})},d=function(){if(n.$popup){var t=n.$popup.find(".window").outerHeight();n.$popup.find(".window").css({width:n.options.width,marginTop:-t/2,marginLeft:-n.options.width/2})}};this.showMessage=function(t,i,o){this.hideMessage(function(){var e=new UI.Template("template-ui-popup-message"),u="";switch(t){case"error":u="error";break;case"success":u="success";break;default:u=""}var p=e.render({className:u,content:o});n.$popup&&(n.$popup.find(".messages").html(p).transition({height:n.$popup.find(".messages > .message").outerHeight()},300,"easeOutQuad"),setTimeout(function(){i>0&&(a=setTimeout(function(){n.hideMessage()},i))},300)),s=!0})},this.hideMessage=function(t){clearTimeout(a),s?(this.$popup.find(".messages").transition({height:0},200,"easeOutQuad"),setTimeout(function(){s=!1,n.$popup.find(".messages").empty(),t&&t()},200)):(s=!1,t&&t())},this.changeContent=function(t){this.$popup&&(this.$popup.find(".content").html(t),d())},this.changeTitle=function(t){this.$popup&&(this.$popup.find(".title").html(t),d())},this.setWaitingMode=function(t,i){clearTimeout(u),this.state="waiting",n.$popup&&(n.$popup.find(".window").addClass("wait"),t>0&&(u=setTimeout(function(){n.removeWaitingMode(),i&&i()},t)))},this.removeWaitingMode=function(){clearTimeout(u),this.state="idle",n.$popup&&n.$popup.find(".window").removeClass("wait")},this.show=function(t,i){this.hide(),this.$popup=$(r(t,i)),$("body").append(this.$popup),this.options.modal&&$("html,body").css("overflow","hidden"),d(),n.options.onBeforeShow(n),o=new UI.Animate({$element:this.$popup.find(".window"),animationDuration:this.options.animationDuration}),e=new UI.Animate({$element:this.$popup.find(".overlay"),animationDuration:this.options.animationDuration}),e.play("fadeIn"),o.play("appear",function(){c(),n.options.onShow(n)})},this.hide=function(){this.$popup&&this.popup.length>0&&(e.play("fadeOut"),o.play("disappear",function(){l(),n.$popup.remove(),n.options.onHide(n),n.$popup=null,o=null,e=null,n.options.modal&&$("html,body").css("overflow","auto")}))}},UI.Tabs=function(t){var n=this,i=_.uniqueId("UITabs_"),o;this.options=$.extend({tabsSelector:"#tabs",tabsContentSelector:"#tabs-content",sliding:!0,onTabOpen:function(t){}},t);var e=$(this.options.tabsSelector),s=$(this.options.tabsContentSelector),a=null;this.openTab=function(t){return o=t,c(),p(),this.options.onTabOpen(t),t},this.next=function(){var t=e.find(">a.active").next("a");return t.length>0?n.openTab(u(t)):void 0},this.prev=function(){var t=e.find(">a.active").prev("a");return t.length>0?n.openTab(u(t)):void 0},this.getActive=function(){return active};var u=function(t){var n=t.attr("href");return n?n.substr(1,n.length):void 0},p=function(t){n.options.sliding!==!0||t||s.addClass("sliding");var i=s.find(".page").filter('[data-tab="'+o+'"]');s.find(".page").removeClass("active"),i.addClass("active"),l(),n.options.sliding!==!0||t||(clearTimeout(a),a=setTimeout(function(){s.removeClass("sliding")},450))},c=function(){var t=e.find('>a[href="#'+o+'"]');e.find(">a").removeClass("active"),t.addClass("active"),t.length>0&&e.find(">.marker").css({left:t.position().left,top:t.position().top,width:t.outerWidth(),height:t.outerHeight()})},l=function(){var t=s.width()-(s.outerWidth()-s.width()),n=s.find(".page"),i=n.filter(".active");n.css({width:t}),s.find(".pages").css({width:t*n.length,left:-i.position().left}),s.css({height:i.outerHeight()})},r=function(){e.find(">a").off("click").on("click",function(t){t.preventDefault(),n.openTab(u($(this)))}),s.wrapInner('<div class="pages"></div>'),s.find(".page").css({display:"block"}),o=u(e.find(">a.active")),c(),p(!0),n.options.sliding===!0&&setTimeout(function(){e.addClass("sliding")},1),$(window).off("resize."+i).on("resize."+i,function(){l()})};e.length>0&&s.length>0&&r()},UI.Fullscreen=function(t){var n=this,i=_.uniqueId("UIFullscreen_"),o=null,e=null;this.options=$.extend({onBeforeShow:function(){},onShow:function(t){},onHide:function(t){},animationDuration:500},t),this.$fs=null;var s=function(t){var n=new UI.Template("template-ui-fullscreen");return n.render(t)},a=function(){u(),n.$fs&&n.$fs.length>0&&n.$fs.find(".close").on("click",function(t){t.preventDefault(),n.hide()}),$(document).on("keyup."+i,function(t){switch(t.keyCode){case 27:n.hide()}})},u=function(){$(document).off("keyup."+i)};this.show=function(t,i,u,p){this.$fs=$(s({title:t,subtitle:i,content:u,toolbar:p})),$("body").append(this.$fs),$("html,body").css("overflow","hidden"),n.options.onBeforeShow(n),o=new UI.Animate({$element:this.$fs.find(".window"),animationDuration:this.options.animationDuration}),e=new UI.Animate({$element:this.$fs.find(".overlay"),animationDuration:this.options.animationDuration}),e.play("fadeIn"),o.play("slideDown",function(){a(),n.options.onShow(n)})},this.hide=function(){this.$fs&&this.$fs.length>0&&(u(),o.play("slideUp",function(){e.play("fadeOut",function(){n.$fs.remove(),n.options.onHide(n),n.$fs=null,o=null,e=null,$("html,body").css("overflow","auto")})}))}};