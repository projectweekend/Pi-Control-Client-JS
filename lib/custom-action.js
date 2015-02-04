var RPCClient = require( "./rpc" ).RPCClient;


var CustomActionClient = function ( rabbitUrl ) {

    RPCClient.call(this, rabbitUrl, "custom_action_service");

};

CustomActionClient.prototype = Object.create( RPCClient.prototype );

CustomActionClient.prototype.constructor = CustomActionClient;

CustomActionClient.prototype.call = function( deviceKey, actionName, done ) {

    return this._call( deviceKey, {
        action: actionName
    }, done );

};

exports.CustomActionClient = CustomActionClient;
