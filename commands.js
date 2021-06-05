'use strict';

const config = require('config');
const client = require('./client.js');

const activeChannel = config.get('channel');

const checkModeratorPermission = state =>
  state.user.mod || state.user.username === activeChannel;

const clear = messageInfo => {
  if (!checkModeratorPermission(messageInfo)) return;

  client.clear(config.get('channel'));
};

const tossCoin = () => {
  const sides = ['eagle', 'tails'];
  return sides[Math.floor(Math.random() * 2)];
};

const coin = () => {
  const res = tossCoin();
  client.say(activeChannel, `You’ve got ${res}`);
};

const rollDice = () => {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
};

const dice = () => {
  const num = rollDice();
  client.say(activeChannel, `You rolled a ${num}`);
};

const timeOutUser = (args, messageInfo) => {
  if (!checkModeratorPermission(messageInfo)) return;

  const [targetUser, timeOutDuration] = args;

  client.timeout(activeChannel, targetUser, timeOutDuration);
  client.action(
    activeChannel,
    `${targetUser} now u have timeout mode! Duration: ${timeOutDuration}`
  );
};

const callCommand = (command, messageInfo) => {
  const commandToAction = {
    'to': () => timeOutUser(command.args, messageInfo),
    'clear': () => clear(messageInfo),
    'fb': () => client.action(activeChannel, config.get('social.facebook')),
    'twt': () =>  client.action(activeChannel, config.get('social.twitter')),
    'inst': () => client.action(activeChannel, config.get('social.instagram')),
    'coin': () => coin(),
    'dice': () => dice(),
  };

  const action = commandToAction[command.command];
  if (!action) return;

  action();
};

module.exports = {
  call: (command, messageInfo) => {
    callCommand(command, messageInfo);
  },
};
