(function(){
	var $$ = {};
	
	$$.data = {
		ls_key:"debug"
	};
	
	// init-run
	$$.__construct = function(){
		
		var save = document.getElementById("save");
		if(save !== null){
			save.onclick = $$.save;
		}
		var view = document.getElementById("view");
		if(view !== null){
			view.onclick = $$.view;
		}
		var list = document.getElementById("list");
		if(list !== null){
			list.value = unescape(localStorage.getItem($$.data.ls_key));
		}
	};
	
	$$.save = function(){
		var list = document.getElementById("list");
		if(list != null){
			localStorage.setItem($$.data.ls_key , escape(list.value) );
		};
	};
	
	$$.view = function(){
		var list = document.getElementById("list");
		if(list === null){return}
		var lists = list.value.split("\n");
		for(var i=0; i<lists.length; i++){
			if(!lists[i].match(/^http/)){continue}
			chrome.tabs.update({"url":lists[i]});
			$$.sleep(3000);
		}
	};
	
	$$.sleep = function(sleep_time){
		var current = new Date();
		var end_point = new Date();
		for(var i=0;current.getTime()-end_point.getTime()<sleep_time;i++){
			current = new Date();
		}
	};
	
	// run
	window.addEventListener("load",$$.__construct);
})();
