const tmi = require ('tmi.js');
const config = require('./config.js')

const client = new tmi.client(config);

module.exports = client