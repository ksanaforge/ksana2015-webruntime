/** @jsx React.DOM */
/*
convert to pure js
save -g reactify
*/
var hasksanagap=(typeof ksanagap!="undefined");
if (hasksanagap && (typeof console=="undefined" || typeof console.log=="undefined")) {
		window.console={log:ksanagap.log,error:ksanagap.error,debug:ksanagap.debug,warn:ksanagap.warn};
		console.log("install console output funciton");
}

var checkfs=function() {
	return (navigator && navigator.webkitPersistentStorage) || hasksanagap;
}
var featurechecks={
	"fs":checkfs
}
var checkbrowser = React.createClass({
	getInitialState:function() {

		var missingFeatures=this.getMissingFeatures();
		return {ready:false, missing:missingFeatures};
	},
	getMissingFeatures:function() {
		var feature=this.props.feature.split(",");
		var status=[];
		feature.map(function(f){
			var checker=featurechecks[f];
			if (checker) checker=checker();
			status.push([f,checker]);
		});
		return status.filter(function(f){return !f[1]});
	},
	downloadbrowser:function() {
		window.location="https://www.google.com/chrome/"
	},
	renderMissing:function() {
		var showMissing=function(m) {
			return React.createElement("div", null, m);
		}
		return (
		 React.createElement("div", {ref: "dialog1", className: "modal fade", "data-backdrop": "static"}, 
		    React.createElement("div", {className: "modal-dialog"}, 
		      React.createElement("div", {className: "modal-content"}, 
		        React.createElement("div", {className: "modal-header"}, 
		          React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
		          React.createElement("h4", {className: "modal-title"}, "Browser Check")
		        ), 
		        React.createElement("div", {className: "modal-body"}, 
		          React.createElement("p", null, "Sorry but the following feature is missing"), 
		          this.state.missing.map(showMissing)
		        ), 
		        React.createElement("div", {className: "modal-footer"}, 
		          React.createElement("button", {onClick: this.downloadbrowser, type: "button", className: "btn btn-primary"}, "Download Google Chrome")
		        )
		      )
		    )
		  )
		 );
	},
	renderReady:function() {
		return React.createElement("span", null, "browser ok")
	},
	render:function(){
		return  (this.state.missing.length)?this.renderMissing():this.renderReady();
	},
	componentDidMount:function() {
		if (!this.state.missing.length) {
			this.props.onReady();
		} else {
			$(this.refs.dialog1.getDOMNode()).modal('show');
		}
	}
});

module.exports=checkbrowser;