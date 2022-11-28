// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const config = require('./config.json');
const deploy = require('./Utilites/deploy-commands')(client, Collection)
const fs = require('fs');
const { exitCode, exit } = require('process');
let createMessage = true

const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./Events/${file}`);
    if (event.once) {
        client.once(event[0].name, (...args) => event[0].execute(...args));
    } else {
        client.on(event[0].name, (...args) => { event[0].execute(...args); });
    }
}


// Login to Discord with your client's token
client.login(config.Bot.TOKEN)
