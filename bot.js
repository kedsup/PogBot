const client = require('./client.js')
const commandResolver = require('./commandResolver.js')
client.connect()

// Commands
client.on('chat', (channel, user, message, self) => {
  if (self) return // bot message

  // if message has symbol that means command - !
  if ((message.indexOf('!')) !== -1) {
    commandResolver.resolve(channel, user, message)
  }

  setInterval( ()=> {
    client.say(channel, "Please, be polite!");
  }, 30000);
});

client.on("join", (channel, user, message, self) => {
  client.action(channel, user + " , glad to see you!");
});
