module.exports = {
  name: 'ban',
  description: '$ban MEMBER_ID:Bans an individual from the channel',
  usage: '[Member ID]',
  execute(message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS'))
      return message.reply('You do not have permission!');
    if (args.length === 0) return message.reply('Please provide an ID');
    try {
      message.guild.members
        .ban(args[0])
        .then((result) => {
          message.channel.send(`User banned!`);
        })
        .catch((err) => {
          message.channel.send('Error occured');
        });
    } catch (err) {
      message.channel.send('Error occured');
    }
  },
};

