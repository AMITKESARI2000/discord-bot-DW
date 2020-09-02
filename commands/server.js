module.exports = {
  name: 'server',
  description: '$server:server/channel details',
  execute(message, args) {
    message.channel.send(
      `Server name: ${message.guild.name}
        Total members: ${message.guild.memberCount}
        Region: ${message.guild.region}`
    );
  },
};
