'use strict';

const tmi = require('tmi.js');
const config = require('./config.js');

const client = new tmi.Client(config);

module.exports = client;
