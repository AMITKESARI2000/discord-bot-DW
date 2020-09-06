module.exports = {
  name: 'kick',
  description: '$kick MEMBER_IDs: kicks a member out of channel',
  usage: '[Member ID]',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS'))
      return message.reply('You do not have permission!');
    if (args.length === 0) return message.reply('Please provide an ID');
    const member = message.guild.members.cache.get(args[0]);
    if (member) {
      member
        .kick()
        .then((member) => message.channel.send(`${member} kicked`))
        .catch((err) => message.channel.send(`Permission denied`));
    } else {
      message.channel.send('Member not found');
    }
  },
};
