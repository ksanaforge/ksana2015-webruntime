var React=(window&&window.React)||require("react");
var Fileinstaller=require("./fileinstaller");

var getRequire_kdb=function() {
    var required=[];
    ksana.js.files.map(function(f){
      if (f.indexOf(".kdb")==f.length-4) {
        var slash=f.lastIndexOf("/");
        if (slash>-1) {
          var dbid=f.substring(slash+1,f.length-4);
          required.push({url:f,dbid:dbid,filename:dbid+".kdb"});
        } else {
          var dbid=f.substring(0,f.length-4);
          required.push({url:ksana.js.baseurl+f,dbid:dbid,filename:f});
        }        
      }
    });
    return required;
}
var callback=null;
var onReady=function() {
	callback();
}
var openFileinstaller=function(keep) {
	var require_kdb=getRequire_kdb().map(function(db){
	  return {
	    url:window.location.origin+window.location.pathname+db.dbid+".kdb",
	    dbdb:db.dbid,
	    filename:db.filename
	  }
	})
	return React.createElement(Fileinstaller, {quota: "512M", autoclose: !keep, needed: require_kdb, 
	                 onReady: onReady});
}
var installkdb=function(ksanajs,cb,context) {
	React.render(openFileinstaller(),document.getElementById("main"));
	callback=cb;
}
module.exports=installkdb;