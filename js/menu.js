/**
 * Dynamic menu. Will be displayed for all elements that contain a data attribute
 * follow the following format:
 *	data-menu-content='{
 *		"menu":[
 *			{"item":"Vergleichen", "icon":"icon-compare", "action":"compare", "data":"111111"},
 *			{"item":"Preiswecker", "icon":"icon-pricealarm", "action":"pricealarm", "data":"222222"},
 *			{"item":"Löschen", "icon":"icon-delete", "action":"delete", "data":"333333"}
 *		]}'>
 *
 * author: Carlos Baeza
 * version: 0.0.1
 * date: 31. March 2016
 */
$(function(){
	'use strict';

	if(Modernizr.mobile){
		// Remove all active menues for touch devices
		$(document).bind( "touchstart",function(event){
			// console.log('touchstart');
			removeActiveMenues();
		});
	}else{
		// Remove all active menues for desktop devices
		$(document).click(function(event){
			// console.log('click');
			removeActiveMenues();
		});	
	}

	function removeActiveMenues(){
		var $activeMenues = $('.menu');
		// console.log($activeMenues.length);
		if( typeof $activeMenues !== 'undefined' && $activeMenues.length > 0){
			for(var i=0 ; i < $activeMenues.length; i++){
				var menu = $activeMenues[i];
				menu.remove();
				/*menu.detach();*/
			}
		}
	}
	
	var Menu;
	window.menu = Menu = (function(){

		var options, viewPortHeigth, viewPortWidth;

		function Menu(options){
			var c = this;
			c.options = options;
			c.init();
		}

		Menu.prototype.init = function(){
			var c, $menues; 
			c = this;
			$menues = $('[data-menu-content]');
			if( typeof $menues !== 'undefined' && $menues.length > 0){
				for(var i=0 ; i < $menues.length; i++){
					c.bindEvent($menues[i]);
				}	
			}
		} // init

		Menu.prototype.bindEvent = function(item){
			var c = this;
			$(item).click( function(event){
				event.preventDefault();
				event.stopPropagation();
				var content = $(this).data('menu-content');
				console.log(content)
				c.showMenu(content, event);
			});
		} // setEvent

		Menu.prototype.showMenu = function(content, event){
			var c, $menu, _top, _left, dialogWidth, viewPortWidth, viewPortHeigth;

			c = this;
			viewPortWidth = window.innerWidth || 320;
			viewPortHeigth = window.innerHeight || 568;
			dialogWidth = 152;
			
			$menu = $("<div class='menu'>").append("<ul class='menu-list'>");
			for( var i=0 ; i < content.menu.length ; i++){
				var item = content.menu[i];
				var $li = $("<li class='menu-list-item'>");
				$li.append("<a href='#' class='menu-link " + item.icon + "'>" + item.item + "</a></li>");
				$li.click(function(event){
					c.handleMenuEvent(event);
				});	
				$($menu).append($li);
			}

			// console.log('event.currentTarget.clientHeight: ' + event.currentTarget.clientHeight);
			// console.log('event.currentTarget.clientWidth: ' + event.currentTarget.clientWidth);
			// console.log('pageX: ' + event.pageX);
			// console.log('pageY: ' + event.pageY);
			// console.log('offsetX: ' + event.offsetX);
			// console.log('offsetY: ' + event.offsetY);
			// console.log('viewPortWidth: ' + viewPortWidth);
			// console.log('viewPortHeigth: ' + viewPortHeigth);
			
			_top = event.pageY + (event.currentTarget.clientHeight - event.offsetY) + 10 + 'px';

			if( (event.pageX + dialogWidth) > viewPortWidth){
				_left = (event.pageX + (event.currentTarget.clientWidth - event.offsetX) - dialogWidth) + 'px';
			}else{
				_left = event.pageX - event.offsetX + 'px';
			}
			$($menu).css({
				top: _top,
				left: _left
			});

			$menu.append('</ul></div>').appendTo('body');
		} // showMenu

		Menu.prototype.handleMenuEvent = function(event){
			console.log(event);
			// TODO: do something

			// then close menu
			$(event.target).closest('.menu').remove();
		} //handleMenuEvent


		return Menu;
	})(); //Menu
	
	var options = { someOption: 'some data to read' };
	new Menu(options);

});