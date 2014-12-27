/** @jsx React.DOM */

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
			return <div>{m}</div>;
		}
		return (
		 <div ref="dialog1" className="modal fade" data-backdrop="static">
		    <div className="modal-dialog">
		      <div className="modal-content">
		        <div className="modal-header">
		          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
		          <h4 className="modal-title">Browser Check</h4>
		        </div>
		        <div className="modal-body">
		          <p>Sorry but the following feature is missing</p>
		          {this.state.missing.map(showMissing)}
		        </div>
		        <div className="modal-footer">
		          <button onClick={this.downloadbrowser} type="button" className="btn btn-primary">Download Google Chrome</button>
		        </div>
		      </div>
		    </div>
		  </div>
		 );
	},
	renderReady:function() {
		return <span>browser ok</span>
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