(function(global) {
	global.required = {};
	global.require = function(name) {
		if(!global.required[name]) {
			global.required[name] = null;
			http = new XMLHttpRequest();
			http.open("GET","/modules/"+name+".js",false);
			http.send();
			global.required[name] = new Function(
				"var module=null;\n"+
				"try{\n"+
				http.responseText+
				";\n} catch(exception) {\n"+
				"console.log(exception);\n"+
				"}\n"+
				"return export;"
			);
		}
		return global.required[name]();
	}
}(this));
