
var readDir=function(cb,context){
	require("./html5fs").readdir(cb,context);
}
var listApps=function(){
	return "[]";
}
module.exports={readDir:readDir,listApps:listApps};