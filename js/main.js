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
			console.log('init');
		}

		return Main;
	})(); //Main
	
	var options = { someOption: 'some data to read' };
	new Main(options);

})();