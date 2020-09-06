module.exports = {
  name: 'ping',
  description: '$ping',
  usage: '',
  execute(message, args) {
    message.channel.send('Pong🎆');
    const ping = Math.abs(Date.now() - message.createdTimestamp);
    message.channel.send('〽️ Your ping is `' + `${ping}` + ' ms`');
  },
};
