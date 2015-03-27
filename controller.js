"use strict";

var Q = require('q');
var retry = require('q-retry').retry;

var hue = require('node-hue-api');
var HueApi = hue.HueApi;
var createState = hue.lightState.create;

var ProgressBar = require('progress');

var actionheroClient = require('actionhero-client');
var sociaLights = new actionheroClient();

var options = {
  ip: null,
  username: null
};

var api = null;

var log = function(res) {
  console.log(res);
  return res;
};

var shutdown = function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Shutting down...');
  api.setGroupLightState(0, createState().shortAlert()).then(function() {
    process.exit(0);
  });
};

var startServerConnection = function() {

  sociaLights.on('say', function(msgBlock) {
    if (msgBlock.from === 0 && msgBlock.message.cmdType === 'HUECMD') {
      var state = createState();
      msgBlock.message.state.forEach(function(modifier) {
        var fun = modifier.shift();
        state[fun].apply(state, modifier);
      });

      if (msgBlock.message.to) {
        api.setLightState(msgBlock.message.to, state)
          .then(function() {
            console.log('Updated light ' + msgBlock.message.to + ' to state', state._values);
          })
          .fail(function(err) {
            console.log('Error:', err);
          });
      } else {
        api.setGroupLightState(0, state)
          .then(function() {
            console.log('Updated lights to state', state._values);
          })
          .fail(function(err) {
            console.log('Error:', err);
          });
      }
    }
  });

  sociaLights.on('error', function(err, data) {
    console.log('Server Error: ' + err);
    if (data) { console.log(data); }
  });

  sociaLights.on('end', function() {
    console.log('Server Connection Ended.');
    shutdown();
  });

  sociaLights.on('timeout', function(err, request, caller) {
    console.log(request + ' timed out');
  });

  sociaLights.connect({
    host: process.env.SOCIALIGHTS_HOST || 'hylkevisser.nl' ,
    port: 5000,
  }, function() {
    sociaLights.roomAdd('room:demo', function(err) {
      if (err) {
        console.log('Error connecting to server.', err);
      } else {
        console.log('Waiting for server events.');
      }
    });
  });

  return;
};

var selectBridge = function(bridges) {
  if (bridges.length === 0) {
    throw new Error('Hue Bridge could not be found.');
  }
  if (bridges.length > 1) {
    console.log('Warning: Multiple Hue Bridges found. Picking the first one.');
  }
  var bridge = bridges[0];
  return bridge.ipaddress;
};

var setBridgeIP = function() {
  return Q.fcall(function() {
    if (process.env.HUE_BRIDGE_IP) {
      return process.env.HUE_BRIDGE_IP;
    } else {
      console.log('Looking for Hue Bridges...');
      return hue.nupnpSearch().then(selectBridge);
    }
  }).then(function(ip) {
    console.log('Using Hue Bridge at ' + ip + '.');
    options.ip = ip;
    return;
  });
};

var registerUser = function() {
  console.log('Press the Link button on your Hue Bridge.');

  var retries = 20;

  var bar = new ProgressBar('  waiting... [:bar]', {
    complete: '=',
    incomplete: ' ',
    width: 40,
    total: retries + 1
  });

  var doRegister = function() {
    return (new HueApi()).registerUser(options.ip, null, 'SociaLights Controller');
  };

  var nextTry = function(reason, retriesLeft) {
    bar.tick();
  };

  return retry(doRegister, nextTry, {limit: retries, interval: 1000})
    .then(function(result) {
      return result;
    })
    .fail(function(error) {
      throw new Error('Unable to register new username.', error);
    });
};

var getUser = function() {
  return Q.fcall(function() {
    if (process.env.HUE_USER) {
      return process.env.HUE_USER;
    } else {
      console.log('Registering new username...');
      return registerUser();
    }
  }).then(function(username) {
    console.log('Using username ' + username + '.');
    options.username = username;
    return;
  });
};

var initializeAPI = function() {
  api = new HueApi(options.ip, options.username);
  return api;
};

var initializeLights = function() {
  process.on('SIGINT', shutdown);
  return api.setGroupLightState(0, createState().shortAlert().hsl(0, 0, 0));
};

Q
  .fcall(setBridgeIP)
  .then(getUser)
  .then(initializeAPI)
  .then(initializeLights)
  .then(startServerConnection)
  .fail(shutdown)
  .done();
