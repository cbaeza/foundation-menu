(function(){
	'use strict';

	var Main = (function(){

		var options;

		function Main(options){
			var c = this;
			console.log('Main');
			c.options = options;
			c.init();
		}

		Main.prototype.init = function(){
			var c = this;
			console.log('init');
			var $menues = $('[data-menu-content]');
			console.log($menues.length);
			if( typeof $menues !== 'undefined' && $menues.length > 0){
				for(var i=0 ; i < $menues.length; i++){
					c.setEvent($menues[i]);
				}	
			}
		} // init

		Main.prototype.setEvent = function(item){
			var c = this;
			console.log('setEvent');
			$(item).click( function(event){
				console.log(event);
				var content = $(this).data('menu-content').replace(/\'/g, '"');
				var o = JSON.parse(content);
				c.showMenu(o, event);
			});
		} // setEvent

		Main.prototype.showMenu = function(content, event){
			//console.log(content);
			var menu = $('<div>').addClass('menu').append('<ul>');
			for( var i=0 ; i < content.menu.length ; i++){
				$(menu).append('<li>' + content.menu[i].item + '</li>');
			}
			console.log('pageX: ' + event.pageX);
			console.log('pageY: ' + event.pageY);

			var _top, _left;
			_top = event.pageY + 'px';
			_left = event.pageX + 'px'
			
			$(menu).css({
				top: _top,
				left: _left
			});
			menu.append('</ul>').appendTo('body');
		} // showMenu

		
		return Main;
	})(); //Main
	
	var options = { someOption: 'some data to read' };
	new Main(options);

})();