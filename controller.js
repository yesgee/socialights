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

var maxBrightness = 255;
var minBrightness = 40;
var answerFlickers = 4;
var lengthOfFlicker = 1000;
var currentTeams = null;

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

var setLightState = function(light, state) {
  if (light === 0) {
    api.setGroupLightState(0, state)
      .then(function() {
        console.log('Updated lights to state', state._values);
      })
      .fail(function(err) {
        console.log('Error:', err);
      });
  } else {
    api.setLightState(light, state)
    .then(function() {
      console.log('Updated light ' + light + ' to state', state._values);
    })
    .fail(function(err) {
      console.log('Error:', err);
    });
  }
};

var setTeamLight = function(team, color, brightness) {
  var light = team === 0 ? 1 : 3; //go to first or third light
  brightness = typeof brightness !== 'undefined' ? brightness : maxBrightness;
  var state = createState();
  state.rgb(color);
  state.bri(brightness);
  // state.transitionSlow();
  setLightState(light, state);
};

var setTeamScores = function(teams) {
  clearTimeouts();
  currentTeams = teams;
  var maxTeamIdx = teams[1].score > teams[0].score ? 1 : 0;
  var minTeamIdx = (maxTeamIdx + 1) % 2;
  var max = teams[maxTeamIdx].score;
  var min = teams[minTeamIdx].score;
  var minBright = (maxBrightness - minBrightness) * (min / max) + minBrightness;
  setTeamLight(minTeamIdx, teams[minTeamIdx].color, minBright);
  setTeamLight(maxTeamIdx, teams[maxTeamIdx].color);
  var state = createState(); //set middle light to white
  state.rgb([255, 255, 255]);
  state.bri(minBrightness);
  setLightState(2, state);
};

var clearTimeouts = function() {
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
};

var answer = function(correct) {
  clearTimeouts();

  var state = createState();
  if (correct) {
    setAll(146, 100, 0); //green
  } else {
    setAll(356, 100, 0); //red
  }
  state.alertShort();
  var flicker = function() {setLightState(0, state);};

  for (var i = 1; i <= answerFlickers; i++) {
    timeouts.push(setTimeout(flicker, i * lengthOfFlicker));
  }

  timeouts.push(setTimeout(function() {
    if (currentTeams) {
      setTeamScores(currentTeams);
    }
  }, (answerFlickers + 1) * lengthOfFlicker));
};

var gameOver = function() {
  var state = createState();
  state.colorLoop();
  state.bri(maxBrightness);
  setLightState(0, state);
};

var reset = function() {
  var state = createState();
  state.reset();
  state.effect('none');
  setLightState(0, state);
};

var timeouts = [];

var countDown = function(seconds) {
  clearTimeouts();
  var state = createState();
  state.rgb([0, 255, 0]);
  state.bri(maxBrightness);
  setLightState(2, state);

  var flicker = function(i) {
    var percentageDone = i / seconds;
    var rgb = [percentageDone * 255, (1 - percentageDone) * 255, 0];
    var state = createState();
    state.rgb(rgb);
    state.alertShort();
    setLightState(2, state); //middle light
  };
  for (var i = 1; i <= seconds; i++) {
    timeouts.push(setTimeout(flicker, i * lengthOfFlicker, i));
  }
  timeouts.push(setTimeout(answer, (seconds) * lengthOfFlicker, false));
};

var setAll = function(h, s, l) {
  var state = createState();
  state.hsl(h, s, l);
  state.bri(maxBrightness);
  setLightState(0, state);
};

var startServerConnection = function() {

  sociaLights.on('say', function(msgBlock) {
    if (msgBlock.from === 0) {
      var state = createState();
      switch (msgBlock.message.cmdType) {
        case 'HUECMD':
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
          break;

        case 'SETTEAM':
          var team = msgBlock.message.team;
          var color = msgBlock.message.color;
          setTeamLight(team, color);
          break;
        case 'SETSCORES':
          console.log('setting scores');
          var teams = msgBlock.message.teams;
          setTeamScores(teams);
          break;
        case 'ANSWER':
          answer(msgBlock.message.correct);
          break;
        case 'STARTCOUNTDOWN':
          countDown(msgBlock.message.seconds);
          break;
        case 'GAMEOVER':
          gameOver();
          break;
        case 'NEWGAME':
          reset();
          break;

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
