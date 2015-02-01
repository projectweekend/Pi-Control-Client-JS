var async = require( "async" );
var uuid = require( "node-uuid" );
var amqp = require( "amqplib/callback_api" );


var RPCClient = function ( rabbitUrl, exchange ) {

    this._rabbitUrl = rabbitUrl;
    this._exchange = exchange;
    this._corrId = null;

    var _this = this;

    var connectToRabbit = function ( done ) {

        amqp.connect( _this._rabbitUrl, function ( err, conn ) {

            if ( err ) {
                return done( err );
            }

            _this._connection = conn;

            return done( null );

        } );

    };

    var createChannel = function ( done ) {

        _this._connection.createChannel( function ( err, ch ) {

            if ( err ) {
                return done( err );
            }

            _this._channel = ch;

            return done( null );

        } );

    };

    var createReplyQueue = function ( done ) {

        var options = {
            exclusive: true
        };

        _this._channel.assertQueue( "", options, function ( err, ch ) {

            if ( err ) {
                return done( err );
            }

            _this._replyToQueue = ch.queue;

            return done( null );

        } );

    };

    var handleResponse = function ( message ) {

        if ( message.properties.correlationId === _this._corrId ) {

            _this._response = message.content.toString();

        }

    };

    var listenOnReplyQueue = function ( done ) {

        var options = {
            noAck: true
        };

        _this._channel.consume( _this._replyToQueue, handleResponse, options, function ( err ) {

            if ( err ) {
                return done( err );
            }

            return done( null );

        } );

    };

    var tasks = [
        connectToRabbit,
        createChannel,
        createReplyQueue,
        listenOnReplyQueue
    ];

    async.series( tasks, function ( err ) {

        if ( err ) {
            console.error( err );
            process.exit( 1 );
        }

    } );

};

RPCClient.prototype.call = function( routingKey, message, done ) {

    var _this = this;

    _this._corrId = uuid();
    _this._response = null;

    var buffer = new Buffer( JSON.stringify( message ) );

    var options = {
        replyTo: _this._replyToQueue,
        correlationId: _this._corrId
    };

    _this._channel.publish( _this._exchange, routingKey, buffer, options );

    var i = setImmediate( function checkResponse () {
        if ( _this._response !== null ) {
            clearImmediate( i );
            return done( null, JSON.parse( _this._response ) );
        }
        i = setImmediate( checkResponse );
    } );

};


exports.RPCClient = RPCClient;
