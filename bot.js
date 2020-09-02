const fs = require('fs');
const dotenv = require('dotenv');
const { Client, WebhookClient, Collection } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});

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

client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.find((c) => c.name === 'arrivals');
  if (!channel) return;

  channel.send(`Welcome to the server, ${member}. :wave:`);
});

client.on('message', (message) => {
  console.log(`${message.author.username}: ${message.content}`);

  if (message.author.bot || !message.content.startsWith(PREFIX)) return;
  const [command, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});
client.on('message', (message) => {
  const swearWords = [
    'darn',
    'dick',
    'bitch',
    'ass',
    'asshole',
    'piss',
    'bloody',
    'bastard',
    'fuck',
    'shit',
  ];
  if (swearWords.some((word) => message.content.includes(word))) {
    message.reply('Please maintain the decorum of channel!!!');
    message.delete().catch((e) => {});
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
