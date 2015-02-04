This is a Node.js client library for remotely controlling a Raspberry Pi that is running [Pi-Control-Service](https://github.com/projectweekend/Pi-Control-Service). After following the instructions for setting up the service, you will need to reuse the same RabbitMQ connection string and device key values to start a client.


## Install it

```
npm install pi-control-client
```

## GPIO client

The GPIO client (`pi-control-client.GPIOClient`) is used to control a Raspberry Pi running the GPIO service. More information about the service can be found [here](https://github.com/projectweekend/Pi-Control-Service) in the **GPIO service** section.


### Using the GPIO client

```javascript
var GPIOClient = require( "pi-control-client" ).GPIOClient;

// The RabbitMQ connection string (must match the one used when starting the service)
var RABBIT_URL = "some_actual_connection_string";

// A unique string you make up to identify a single Raspberry Pi (must match the one used when starting the service)
var DEVICE_KEY = "my_awesome_raspberry_pi";

var pinsClient = new GPIOClient(RABBIT_URL);

# Get config for all pins
pinsClient.readConfig( DEVICE_KEY, function ( err, result ) {
    if ( err ) {
        // do something with error
    }
    // do something with result
    console.log( result );
} );

# Get config for a single pin
pinsClient.readConfig( DEVICE_KEY, 18, function ( err, result ) {
    if ( err ) {
        // do something with error
    }
    // do something with result
    console.log( result );
} );

# Turn a pin on
pinsClient.on( DEVICE_KEY, 18, function ( err, result ) {
    if ( err ) {
        // do something with error
    }
    // do something with result
    console.log( result );
} );

# Turn a pin off
pinsClient.off( DEVICE_KEY, 18, function ( err, result ) {
    if ( err ) {
        // do something with error
    }
    // do something with result
    console.log( result );
} );

# Read a pin value
pinsClient.readValue( DEVICE_KEY, 18, function ( err, result ) {
    if ( err ) {
        // do something with error
    }
    // do something with result
    console.log( result );
} );
```


## Custom action client

The custom action service (`pi-control-service.CustomActionService`) is used to control a Raspberry Pi running the custom action service. More information about the service can be found [here](https://github.com/projectweekend/Pi-Control-Service) in the **Custom action service** section.


### Using the custom action client

```javascript
var CustomActionClient = require( "pi-control-client" ).CustomActionClient;

// The RabbitMQ connection string (must match the one used when starting the service)
var RABBIT_URL = "some_actual_connection_string";

// A unique string you make up to identify a single Raspberry Pi (must match the one used when starting the service)
var DEVICE_KEY = "my_awesome_raspberry_pi";

var actionsClient = new CustomActionClient( RABBIT_URL );

# Call a custom action
actionsClient.call( DEVICE_KEY, "name_of_action_method", function ( err, result ) {
    if ( err ) {
        // do something with error
    }
    // do something with result
    console.log( result );
} );
```
