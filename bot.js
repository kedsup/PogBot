const client = require('./client.js');
const commandResolver = require('./commandResolver.js');

const intervalTimeout = 30000;

client.connect();

client.on('chat', (channel, user, message, self) => {
  if (self) return;

  const isCommandMessage = message.indexOf('!') !== -1;
  if (isCommandMessage) {
    commandResolver.resolve(channel, user, message);
  }

  setInterval(() => {
    client.say(channel, 'Please, be polite!');
  }, intervalTimeout);
});

client.on('join', (channel, user,) => {
  client.action(channel, user + ' , glad to see you!');
});
