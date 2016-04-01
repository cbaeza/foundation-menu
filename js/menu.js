/**
* Dynamic menu. Will be displayed for all elements that contain a data attribute
* follow the following format:
*	data-menu-content="{
*		'menu':[
*			{'item':'Vergleichen', 'icon':'icon-compare'   , 'link':'http://www.google.de', 'target':'_blank'},
*			{'item':'Preiswecker', 'icon':'icon-pricealarm', 'link':'http://www.google.de', 'target':'_blank'},
*			{'item':'Löschen'    , 'icon':'icon-delete'	   , 'link':'http://www.google.de', 'target':'_blank'}
*		]}"> 
 *
 * author: Carlos Baeza
 * version: 0.0.1
 * date: 31. March 2016
 */
(function(){
	'use strict';

	if(Modernizr.mobile){
		// Remove all active menues for touch devices
		$(document).bind( "touchstart",function(event){
			console.log('touchstart');
			removeActiveMenues();
		});
	}else{
		// Remove all active menues for desktop devices
		$(document).click(function(event){
			console.log('click');
			removeActiveMenues();
		});	
	}

	function removeActiveMenues(){
		var $activeMenues = $('.menu');
		console.log($activeMenues.length);
		if( typeof $activeMenues !== 'undefined' && $activeMenues.length > 0){
			for(var i=0 ; i < $activeMenues.length; i++){
				var menu = $activeMenues[i];
				menu.remove();
				/*menu.detach();*/
			}
		}
	}

	var Menu = (function(){

		var options, viewPortHeigth, viewPortWidth;

		function Menu(options){
			console.log('Menu');
			var c = this;
			c.options = options;
			c.init();
		}

		Menu.prototype.init = function(){
			var c, $menues; 
			c = this;
			$menues = $('[data-menu-content]');
			//console.log($menues.length);
			if( typeof $menues !== 'undefined' && $menues.length > 0){
				for(var i=0 ; i < $menues.length; i++){
					c.setEvent($menues[i]);
				}	
			}
		} // init

		Menu.prototype.setEvent = function(item){
			var c = this;
			//console.log('setEvent');
			$(item).click( function(event){
				event.preventDefault();
				event.stopPropagation();
				var content = $(this).data('menu-content').replace(/\'/g, '"');
				var o = JSON.parse(content);
				c.showMenu(o, event);
			});
		} // setEvent

		Menu.prototype.showMenu = function(content, event){
			var c, menu, _top, _left, dialogWidth, viewPortWidth, viewPortHeigth;

			c = this;
			viewPortWidth = window.innerWidth || 320;
			viewPortHeigth = window.innerHeight || 568;
			dialogWidth = 152;
			
			console.log(event);

			menu = $("<div class='menu'>").append("<ul class='menu-list'>");
			for( var i=0 ; i < content.menu.length ; i++){
				var item = content.menu[i];
				$(menu).append("<li class='menu-list-item'><span class='" + item.icon + "'><a href='" + item.link + "' class='menu-link' target='" + item.target +"'>" + item.item + '</a></span></li>');
			}



			console.log('event.currentTarget.clientHeight: ' + event.currentTarget.clientHeight);
			console.log('event.currentTarget.clientWidth: ' + event.currentTarget.clientWidth);
			console.log('pageX: ' + event.pageX);
			console.log('pageY: ' + event.pageY);
			console.log('offsetX: ' + event.offsetX);
			console.log('offsetY: ' + event.offsetY);
			console.log('viewPortWidth: ' + viewPortWidth);
			console.log('viewPortHeigth: ' + viewPortHeigth);
			
			_top = event.pageY + (event.currentTarget.clientHeight - event.offsetY) + 10 + 'px';

			if( (event.pageX + dialogWidth) > viewPortWidth){
				_left = (event.pageX + (event.currentTarget.clientWidth - event.offsetX) - dialogWidth) + 'px';
			}else{
				_left = event.pageX - event.offsetX + 'px';
			}

			console.log('top: ' + _top)
			console.log('left: ' + _left)
			
			$(menu).css({
				top: _top,
				left: _left
			});

			/*$(menu).mouseleave(function(event){
				event.preventDefault();
				event.stopPropagation();
				console.log('remove');
				menu.remove();
				menu.detach();
			});*/
			console.log(menu)

			menu.append('</ul></div>').appendTo('body');
			console.log($('.menu').width());
			console.log($('.menu').css('width'));
		} // showMenu
		return Menu;
	})(); //Menu
	
	var options = { someOption: 'some data to read' };
	new Menu(options);

})();