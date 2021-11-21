const { MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const config = require('../utils/config.json')
require('discord-reply');

module.exports = {
	name: 'cmds',
	description: 'Get help on how to use the bot and the specific commands',
	aliases: ['?', 'h','help'],
	usage: '[command name]',
	guildOnly: false,
	args: false,
	execute: async (message, args, client) => {

    const naembed = new MessageEmbed()
      .setDescription('> **__You are not allowed to join in that section.__**')
      .setColor('FF1010')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setTimestamp()

    const embed1 = new MessageEmbed()
      .addField(`<:MOD_CT:899066424708968490> **__Moderation Commands__**`,` \n\n> **${config.prefix}ban**\n> • Description: Say ban and you problems will go far away!\n> • Restricted to: Security Trainer, HIAA.\n\n> **${config.prefix}kick**\n> • Description: It's... a kick command. Idk what Moha wants to add here... just a kick command.\n> • Restricted to: Security Trainer, HIAA.\n\n> **${config.prefix}announce**\n> • Description: Makes an announcement with the bot. More information will be available soon!\n> • Restricted to: HIAA+\n\n> **${config.prefix}managepoints**\n> • Description: Here you can administrate the points of any user. **ONLY** if you are HR in the Division you've requested **or** you are HIAA.\n> • Restricted to: Security Trainer, HIAA.`)
      .setColor('7B1C1C')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setTimestamp()

    const embed3 = new MessageEmbed()
      .addField(`<a:INF_CT:899374170255810630> **__Information Commands__**`,`\n> **${config.prefix}whois**\n> • **Description:** Checks the user that you have mentioned.\n> **• Usage:** ${config.prefix}whois <username>`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setTimestamp()
    
    const embed2 = new MessageEmbed()
      .setDescription('**soon**')
    
    const mainembed = new MessageEmbed()
      .setDescription('> **__Help Command__**\n\n> Greetings! If you want to have help, you can check in the menu all the categories that we have, maybe you found what you want! *or maybe not...* **Also!** The propmts have a max of 30 seconds of inactivity. So, don\'t take 3 hours there looking at the menu.')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    const option1 = new MessageMenuOption()
      .setValue('1')
      .setEmoji('899066424708968490')
      .setLabel('Moderation Section')
      .setDescription('All you need to know about moderation!')
    
    const option2 = new MessageMenuOption()
      .setValue('2')
      .setEmoji('⏺️')
      .setLabel('Points Section')
      .setDescription('Check, edit, and review all about points!')
    
    const option3 = new MessageMenuOption()
      .setValue('3')
      .setEmoji('899374170255810630')
      .setLabel('Information')
      .setDescription('Some informative commands that are in the bot!')
    
    const main = new MessageMenu()
      .setID('mhmenu')
      .setPlaceholder('Click me to check all available categories!')
      .addOption(option1)
      .addOption(option2)
      .addOption(option3)

    //https://api.trello.com/1/lists/5f8731b94751a555ef30928f/cards?key=a724a97ef85fe7e1b0253251f6d1ef5f&token=aa48a238ffe3800f6abf046ebce1003791c1152b2ce0331400aaada1eb348ab4
    
    const msg = await message.channel.send(mainembed, main)
    
    const filter = (menu) => menu.clicker.id === message.author.id;
    const collector = msg.createMenuCollector(filter, { time: 30000 })

    collector.on('collect', (menu) => {
      if(menu.values[0] === '1') {
        menu.reply.defer()
        if(!menu.clicker.member.permissions.has('MANAGE_SERVER')) { return menu.message.edit(naembed) } else { return menu.message.edit(embed1) }
      }
      if(menu.values[0] === '2') {
        menu.reply.defer()
        return menu.message.edit(embed2)
      }
      if(menu.values[0] === '3') {
        menu.reply.defer()
        return menu.message.edit(embed3)
      }
    })
  }
}