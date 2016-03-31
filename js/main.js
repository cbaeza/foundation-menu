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
				event.preventDefault();
				event.stopPropagation();
				var content = $(this).data('menu-content').replace(/\'/g, '"');
				var o = JSON.parse(content);
				c.showMenu(o, event);
			});
		} // setEvent

		Main.prototype.showMenu = function(content, event){
			//console.log(content);
			var menu = $("<div>").addClass('menu').append("<ul class='menu-list'>");
			for( var i=0 ; i < content.menu.length ; i++){
				var item = content.menu[i];
				$(menu).append("<li class='menu-list-item'><span class='" + item.icon + "'><a href='"+  item.link +"' class='menu-link' >" + item.item + '</a></span></li>');
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

			$(menu).mouseleave(function(event){
				event.preventDefault();
				event.stopPropagation();
				console.log('remove');
				menu.remove();
				menu.detach();
			});

			menu.append('</ul></div>').appendTo('body');
		} // showMenu

		
		return Main;
	})(); //Main
	
	var options = { someOption: 'some data to read' };
	new Main(options);

})();