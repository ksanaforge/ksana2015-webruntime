var html5fs=require("ksana-document").html5fs;
var htmlfs = React.createClass({
	getInitialState:function() { 
		return {ready:false, quota:0,usage:0,Initialized:false,autoclose:this.props.autoclose};
	},
	initFilesystem:function() {
		var quota=this.props.quota||1024*1024*128; // default 128MB
		quota=parseInt(quota);
		html5fs.init(quota,function(q){
			this.dialog=false;
			$(this.refs.dialog1.getDOMNode()).modal('hide');
			this.setState({quota:q,autoclose:true});
		},this);
	},
	welcome:function() {
		return (
		<div ref="dialog1" className="modal fade" id="myModal" data-backdrop="static">
		    <div className="modal-dialog">
		      <div className="modal-content">
		        <div className="modal-header">
		          <h4 className="modal-title">Welcome</h4>
		        </div>
		        <div className="modal-body">
		          Browser will ask for your confirmation.
		        </div>
		        <div className="modal-footer">
		          <button onClick={this.initFilesystem} type="button" 
		            className="btn btn-primary">Initialize File System</button>
		        </div>
		      </div>
		    </div>
		  </div>
		 );
	},
	renderDefault:function(){
		var used=Math.floor(this.state.usage/this.state.quota *100);
		var more=function() {
			if (used>50) return <button type="button" className="btn btn-primary">Allocate More</button>;
			else null;
		}
		return (
		<div ref="dialog1" className="modal fade" id="myModal" data-backdrop="static">
		    <div className="modal-dialog">
		      <div className="modal-content">
		        <div className="modal-header">
		          <h4 className="modal-title">Sandbox File System</h4>
		        </div>
		        <div className="modal-body">
		          <div className="progress">
		            <div className="progress-bar" role="progressbar" style={{width: used+"%" }}>
		               {used}%
		            </div>
		          </div>
		          <span>{this.state.quota} total , {this.state.usage} in used</span>
		        </div>
		        <div className="modal-footer">
		          <button onClick={this.dismiss} type="button" className="btn btn-default" data-dismiss="modal">Close</button>         
		          {more()}
		        </div>
		      </div>
		    </div>
		  </div>
		  );
	},
	dismiss:function() {
		var that=this;
		setTimeout(function(){
			that.props.onReady(that.state.quota,that.state.usage);	
		},0);
	},
	queryQuota:function() {
		if (ksanagap.platform=="chrome") {
			html5fs.queryQuota(function(usage,quota){
				this.setState({usage:usage,quota:quota,initialized:true});
			},this);			
		} else {
			this.setState({usage:333,quota:1000*1000*1024,initialized:true,autoclose:true});
		}
	},
	render:function() {
		var that=this;
		if (!this.state.quota || this.state.quota<this.props.quota) {
			if (this.state.initialized) {
				this.dialog=true;
				return this.welcome();	
			} else {
				return <span>checking quota</span>
			}			
		} else {
			if (!this.state.autoclose) {
				this.dialog=true;
				return this.renderDefault(); 
			}
			this.dismiss();
			this.dialog=false;
			return <span></span>
		}
	},
	componentDidMount:function() {
		if (!this.state.quota) {
			this.queryQuota();

		};
	},
	componentDidUpdate:function() {
		if (this.dialog) $(this.refs.dialog1.getDOMNode()).modal('show');
	}
});

module.exports=htmlfs;