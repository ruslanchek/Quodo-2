var Demo={};Demo.Table=function(){this.initChecker=function(){var e=new UI.Checker({selector:"#table-checker",onCheck:function(e){$("#table-sample").addClass(e.data("type"))},onUncheck:function(e){$("#table-sample").removeClass(e.data("type"))}})},this.init=function(){this.initChecker()}},Demo.Checker=function(){this.initChecker=function(){var e=new UI.Checker({selector:"#sample-checker"})},this.init=function(){this.initChecker()}},Demo.init=function(){this.table=(new this.Table).init(),this.checker=(new this.Checker).init()},$(function(){Demo.init()});