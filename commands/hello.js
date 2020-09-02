const { description } = require('./ping');

module.exports = {
  name: 'hello',
  description: '$hello',
  execute(message, args) {
    message.reply(`Welcome to this Channel!`); //replies using @user_name
  },
};
