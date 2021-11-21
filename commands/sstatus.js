const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'status',
	description: 'Its.. something.',
	aliases: ['questionoftheday'],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {

    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send(
        "> **Not allowed.**"
      ).then(m => m.delete({ timeout: 5000 }));
    }

    const status = args[0];
    const type = args[1];
    const name = args.join(" ").split(" / "); 

    if(!status) return message.channel.send('> online, dnd, invisible, idle. Nothing more.')
    if(!name) return message.channel.send('> Put a message for the status.')
    if(!type) return message.channel.send('> Category status: PLAYING, WATCHING, STREAMING, LISTENING, COMPETING, CUSTOM_STATUS')
    
    
    client.user.setPresence({
      status: status,
      activity: {
        name: name,
        type: type
       }
    })

  }
}