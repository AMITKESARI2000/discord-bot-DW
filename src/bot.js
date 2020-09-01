const { Client, WebhookClient } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});
const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);
const dotenv = require('dotenv');

const PREFIX = '$';

dotenv.config();

client.once('ready', () => {
  console.log(`${client.user.tag} Bot logged in!`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  // console.log(`${message.author.username}: ${message.content}`);

  // STATIC REPLIES
  if (message.content.toLowerCase() === `${PREFIX}hello`) {
    message.reply(`Welcome to this Channel!`); //replies using @user_name
    // message.channel.send(`hello ${message.author.username}`); //Just a simple message
  } else if (message.content.toLowerCase() === `${PREFIX}server`) {
    message.channel.send(
      `Server name: ${message.guild.name} 
       Total members: ${message.guild.memberCount} 
       Region: ${message.guild.region}`
    );
  }

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === 'kick') {
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
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('You do not have permission!');
      if (args.length === 0) return message.reply('Please provide an ID');
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send(`User banned!`);
      } catch (err) {
        message.channel.send('Error occured');
      }
    } else if (CMD_NAME === 'announce') {
      const msg = args.join(' ');
      console.log(msg);
      webhookClient.send(msg);
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '749725993635282984') {
    switch (name) {
      case '🍎':
        member.roles.add('749724760665227335');
        break;
      case '🍋':
        member.roles.add('749725145823838320');
        break;
    }
  }
});

client.login(process.env.DISCORJS_BOT_TOKEN);
// client.login("NzQ5NzE1Nzk1OTk0NjA3Njg2.X0wBPg.YRyS81yuNp7BX_pwrPU89jYVfaQ");
