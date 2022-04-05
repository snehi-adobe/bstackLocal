var browserstack = require('browserstack-local');
const blocal = new browserstack.Local();
const fs = require('fs')
timeStamp = new Date().getTime();

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    capabilities: [{
        browserName: 'Chrome',
        browserVersion: "latest",
        'bstack:options': {
          'os': 'os X',
          'osVersion': 'Catalina',
          'local': 'true',
          'debug': 'true',
          'consoleLogs': 'info',
          'networkLogs': 'true',
          'chrome': {
              'driver': '2.45',
          }
      },
        acceptInsecureCerts: true,
        maxInstances: 1,
    }],
    logLevel: 'info',
    bail: 0,
    hostname: 'hub.browserstack.com',
    baseUrl: 'http://localhost:3000?name=snehi_testuser',
    waitforTimeout: 50000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
      ['browserstack', {
          browserstackLocal: true,
          forcelocal: false
      }]
  ],
   
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: function (config, capabilities) {
    
      fs.truncate('../param.log', 0, function(){console.log('Cleaned the Log File')});

        console.log("Connecting to browserstack local");
        return new Promise(function (resolve, reject) {
          blocal.start({ 'key': exports.config.key}, function (error) {
            if (error) return reject(error);
            console.log('Successfully Connected');
            resolve();
          });
        });
     },
     onComplete: function(exitCode, config, capabilities, results) {
        return new Promise(function(resolve, reject){
            blocal.stop(function() {
              console.log("Binary stopped");
              resolve();
            });
          });
     },
}
