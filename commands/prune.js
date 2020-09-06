module.exports = {
  name: 'prune',
  description: '$prune NUMBER:Deletes messages',
  aliases: ['remove', 'delete'],
  usage: '[Number of messages]',
  execute(message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.reply('You do not have permission!');
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply("That doesn't seem to be a valid number.");
    } else if (amount <= 1 || amount > 100) {
      return message.reply('Please input a number between 1 and 99.');
    }
    message.channel
      .bulkDelete(amount, true)
      .then(() => console.log(`Bulk deleted ${amount} messages`))
      .catch((err) => {
        console.error(err);
        message.channel.send(
          'There was an error trying to prune messages in this channel!'
        );
      });
  },
};
