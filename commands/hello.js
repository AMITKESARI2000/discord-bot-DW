const { description } = require('./ping');

module.exports = {
  name: 'hello',
  aliases: ['hiya', 'hi'],
  description: '$hello',
  usage: '',
  execute(message, args) {
    message.reply(`Hi!!! \n 😀😄😊 \n Whats up! Long time, no see.!`); //replies using @user_name
  },
};
