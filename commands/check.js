// NOTE: Only for Testing Purposes of all commands
// =>Remove message.author.bot from bot.js to actually execute the commands
// =>Remove message.member.hasPermission('ADMINISTRATOR') check.js if permission problem

const fs = require('fs');
module.exports = {
  name: 'check',
  description: '$check',
  execute(message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.reply('You do not have permission!');

    const commandFiles = fs
      .readdirSync('./commands')
      .filter((file) => file !== 'check.js');

    const fin = commandFiles.map((f) => {
      const nm = `$${f.slice(0, f.length - 3)}`;
      console.log(nm);
      message.channel.send(`${nm}`);
    });
  },
};
