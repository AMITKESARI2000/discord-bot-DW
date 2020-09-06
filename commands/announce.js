const { Client, WebhookClient } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});
const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);
module.exports = {
  name: 'announce',
  description: '$announce STRING:make announcements',
  usage: '[Typpe String to announce]',
  execute(message, args) {
    const msg = args.join(' ');
    console.log(msg);
    webhookClient.send(msg);
  },
};
