const fs = require('fs');
const dotenv = require('dotenv');
const { Client, WebhookClient, Collection } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});
const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);

const PREFIX = '$';
dotenv.config();

client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


client.once('ready', () => {
  console.log(`${client.user.tag} Bot logged in!`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  // console.log(`${message.author.username}: ${message.content}`);

  // ====STATIC REPLIES====
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

  // ====COMMANDS====
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
    } else if (CMD_NAME === 'avatar') {
      if (!message.mentions.users.size) {
        return message.channel.send(
          `Your avatar: <${message.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
          })}>`
        );
      }

      const avatarList = message.mentions.users.map((user) => {
        return `${user.username}'s avatar: <${user.displayAvatarURL({
          format: 'png',
          dynamic: true,
        })}>`;
      });
      message.channel.send(avatarList);
    } else if (CMD_NAME === 'prune') {
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

client.login(process.env.BOT_TOKEN);
