const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons')
const { prefix, colors } = require('./../utils/config.json');
const embedColor = colors.default;

module.exports = {
	name: 'sup',
	description: 'Get help on how to use the bot and the specific commands',
	aliases: ['?', 'h'],
	usage: '[command name]',
	guildOnly: false,
	args: false,
	execute: async (message, args, client) => {

    const embed = new Discord.MessageEmbed()
      .setDescription('> **__Welcome to the Hybrid Tickets!__**\n\n> Please press the buttons to whatever you desire. \n\n> If you want to report an **exploiter**, press in the red button with the label of **Exploiter Report**\n\n> If you don\'t was the last option, maybe you want support, huh? Right, if you want the Normal Support like asking for some features or anything else, press the button **Support**.')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('FFC749')
    
    const exploitbtn = new MessageButton()
      .setLabel('Exploiter Report')
      .setStyle('red')
      .setID('ExpRep')
      .setEmoji('❗')
    
    const supbtn = new MessageButton()
      .setLabel('Support')
      .setStyle('green')
      .setID('SupReq')
      .setEmoji('📩')
    
    message.channel.send({ embed: embed, buttons: [ exploitbtn, supbtn ]})
  },
};
