'use strict';

const commands = require('./commands.js');

const recognizeCommand = message => {
  const regex = /!(.*?)$/gm;
  const fullCommand = regex.exec(message);

  if (fullCommand) {
    const splittedCommand = fullCommand[1].split(' ');
    const [command] = splittedCommand;

    splittedCommand.shift();

    return {
      command,
      args: splittedCommand,
    };
  }

  return false;
};


const commandResolver = (channel, user, message) => {
  const command = recognizeCommand(message);

  if (!command) return;

  commands.call(command, { channel, user, message });
};

module.exports = {
  resolve: (channel, user, message) => {
    commandResolver(channel, user, message);
  },
};
