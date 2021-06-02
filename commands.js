const config = require('config')
const client = require('./client.js')
const activeChannel = config.get('channel')
let state = null;

const clear = () => {
  if (!checkModeratorPermission()) return

  client.clear(config.get('channel'))
}

const coin = () => {
  function tossCoin () {
  const sides = ['eagle', 'tails'];
  return sides[Math.floor(Math.random() * 2)]
}
  const res = tossCoin();
  client.say(activeChannel, `You’ve got ${res}`);
}


const dice = () => {
  function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
  const num = rollDice();
  client.say(activeChannel, `You rolled a ${num}`);
}

const timeOutUser = (args) => {
  if (!checkModeratorPermission()) return

  let targetUser = args[0]
  let timeOutDuration = args[1]

  client.timeout(activeChannel, targetUser, timeOutDuration)
  client.action(activeChannel, targetUser + ' now u have timeout mode! Duration: ' + timeOutDuration)
}

const callCommand = (command, messageInfo) => {
  state = messageInfo;

  switch (command.command) {
    case 'to':
      timeOutUser(command.args)
      break
    case 'clear':
      clear();
      break
    case 'fb':
      client.action(activeChannel, config.get('social.facebook'))
      break
    case 'twt':
      client.action(activeChannel, config.get('social.twitter'))
      break
    case 'inst':
      client.action(activeChannel, config.get('social.instagram'))
      break
    case 'coin':
      coin()
      break 
    case 'dice':
      dice()
      break
    default:
      break
  }
}

const checkModeratorPermission = () => state.user.mod || state.user.username === activeChannel

module.exports = {
  call: (command, messageInfo) => {
    callCommand(command, messageInfo)
  }
}
