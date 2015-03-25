'use strict';

var map = require('mout/array/map');

exports.updates = {
  name: 'updates',
  description: 'I will return the updated objects since a given timestamp',

  outputExample: {
    to: 1427269600340520,
    updates: [
      {
        model: 'User',
        id: '5512654665ad5dad2f67381a',
        type: 'save'
      },
      {
        model: 'User',
        id: '5512654665ad5dad2f673819',
        type: 'save'
      }
    ]
  },

  inputs: {
    from: {
      required: true,
      formatter: function(i) { return Number(i); }
    }
  },

  run: function(api, connection, next) {
    // Get current time in Redis
    api.models.getRedisTime(function(err, time) {
      if (err) {
        api.log('Error: Could not get time from Redis', 'crit');
        connection.response.error = 'Could not get time.';
        next(connection, true);
      } else {
        var args = ['updates', time, '(' + connection.params.from];
        api.redis.client.zrevrangebyscore(args, function(err, updates) {
          if (err) {
            api.log('Error: Could not get updates from Redis', 'crit');
            connection.response.error = 'Could not get updates.';
          } else {
            connection.response.success = true;
            connection.response.to = time;
            connection.response.updates = map(updates, function(update) {
              var u = update.split(':'); // User:5512654665ad5dad2f67381a:save
              return {
                model: u[0],
                id: u[1],
                type: u[2]
              };
            });
          }
          next(connection, true);
        });
      }
    });
  }
};
