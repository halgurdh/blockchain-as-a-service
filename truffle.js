// Allows us to use ES6 in our migrations and tests.
require('babel-register');
var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  networks: {
    "live": {
      network_id: '*',
      host: "13.84.173.162",
      port: 8545 
    },
    build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  }),
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    }
  }
}
