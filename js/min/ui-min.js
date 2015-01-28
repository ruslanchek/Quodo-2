var UI={settings:{templateSettings:{interpolate:/\{\{(.+?)\}\}/g}}};UI.ClickOutside=function(t){var n=this,i=_.uniqueId("UIClickOutside_");this.options=$.extend({$element:"",onClickOutside:function(t){}},t),this.bind=function(){this.unbind(),$(document).on("mouseup."+_id,function(t){$container.is(t.target)||0!==$container.has(t.target).length||onClickOutside&&onClickOutside(t.target)})},this.unbind=function(){$(document).off("mouseup."+_id)}},UI.Animate=function(t){var n=this,i={};this.options=$.extend({$element:"",animationDuration:300},t),i.fadeIn=function(t){$element.transition({opacity:1},animationDuration),t()},i.fadeOut=function(t){$element.transition({opacity:0},animationDuration),t()},i.appear=function(t){$element.transition({scale:0,opacity:1,perspective:"1500px",rotateX:"-90deg"},0),setTimeout(function(){$element.transition({scale:1,opacity:1,rotateX:"0deg"},animationDuration,"easeOutBack"),t()},50)},i.disappear=function(t){$element.transition({scale:0,opacity:1,rotateX:"90deg"},animationDuration,"easeInBack"),t()},this.play=function(t,n){i[t]?i[t](function(){setTimeout(function(){n&&n()},duration)}):console.error("UI.Animate","Animation method not defined",t)}},UI.Template=function(t){var n=this;this.options=$.extend({templateName:""},t),_.templateSettings=UI.settings.templateSettings;var i=function(){var t=$("#"+n.options.templateName).html();return t?t:void console.error("UI.Template","Template is empty",n.options.templateName)};this.render=function(t){var n=_.template(i());return n(t)}},UI.Checker=function(t){var n=this;this.options=$.extend({selector:".checker",onCheck:function(t){},onUncheck:function(t){}},t),$(this.options.selector).find(">a").off("click.UIChecker").on("click.UIChecker",function(t){t.preventDefault();var i="";$(this).data("activeClass")&&(i=" "+$(this).data("activeClass")),$(this).hasClass("active")?($(this).removeClass("active"+i),n.options.onUncheck($(this))):($(this).addClass("active"+i),n.options.onCheck($(this)))})},UI.Popup=function(t){var n=this,i,e;this.$popup=null,this.state="idle",this.options=$.extend({width:400,animationDuration:500,onShow:function(t){},onHide:function(t){}},t);var o=function(){a(),n.$popup&&n.$popup.find(".close").on("click",function(t){t.preventDefault(),n.hide()}),$(window).on("resize.UIPopup",function(){s()}),$(document).on("keyup.UIPopup",function(t){switch(t.keyCode){case 27:n.hide()}})},a=function(){$(document).off("keyup.UIPopup")},p=function(t,n){var i=new UI.Template({templateName:"template-ui-popup"});return i.render({title:t,content:n})},s=function(){if(n.$popup){var t=n.$popup.find(".window").outerHeight();n.$popup.find(".window").css({width:n.options.width,marginTop:-t/2,marginLeft:-n.options.width/2})}};this.showMessage=function(t,i){var e=new UI.Template({templateName:"template-ui-popup-message"}),o="";switch(t){case"error":o="bg-bittersweet-dark";break;case"ok":o="bg-mint-dark";break;default:o="bg-medium-gray-dark"}var a=e.render({className:o,text:i});n.$popup&&n.$popup.find(".messages").html(a)},this.hideMessage=function(){n.$popup.find(".messages").empty()},this.changeContent=function(t){this.$popup&&(this.$popup.find(".content").html(t),s())},this.changeTitle=function(t){this.$popup&&(this.$popup.find(".title").html(t),s())},this.setWaitingMode=function(){this.state="waiting",n.$popup&&n.$popup.find(".window").addClass("wait")},this.removeWaitingMode=function(){this.state="idle",n.$popup&&n.$popup.find(".window").removeClass("wait")},this.show=function(t,a){this.hide(),this.$popup=$(p(t,a)),$("body").append(this.$popup),s(),i=new UI.Animate({$element:this.$popup.find(".window"),animationDuration:this.options.animationDuration}),e=new UI.Animate({$element:this.$popup.find(".overlay"),animationDuration:this.options.animationDuration}),e.play("fadeIn"),i.play("appear",function(){o(),n.options.onShow(n)})},this.hide=function(){this.$popup&&(e.play("fadeOut"),i.play("disappear",function(){a(),n.$popup.remove(),n.options.onHide(n),n.$popup=null,i=null,e=null}))}};