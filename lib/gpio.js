var RPCClient = require( "./rpc" ).RPCClient;


var GPIOClient = function ( rabbitUrl ) {

    RPCClient.call(this, rabbitUrl, "gpio_service");

};

GPIOClient.prototype = Object.create( RPCClient.prototype );

GPIOClient.prototype.constructor = GPIOClient;

GPIOClient.prototype.on = function( deviceKey, pinNumber, done ) {

    return this._call( deviceKey, {
        pin: pinNumber,
        action: "on"
    }, done );

};

GPIOClient.prototype.off = function( deviceKey, pinNumber, done ) {

    return this._call( deviceKey, {
        pin: pinNumber,
        action: "off"
    }, done );

};

GPIOClient.prototype.readValue = function( deviceKey, pinNumber, done ) {

    return this._call( deviceKey, {
        pin: pinNumber,
        action: "read"
    }, done );

};

GPIOClient.prototype.readConfig = function( deviceKey, pinNumber, done ) {

    var options = {
        action: "get_config"
    };

    if ( typeof pinNumber === "function" ) {
        // this is the callback because pinNumber was omitted to get all config
        done = pinNumber;
    } else {
        options.pin = pinNumber;
    }

    return this._call( deviceKey, options, done );

};


exports.GPIOClient = GPIOClient;
