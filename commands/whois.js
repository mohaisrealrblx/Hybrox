const fetch = require('node-fetch');
const { MessageButton, MessageMenuOption, MessageMenu } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const noblox = require("noblox.js")
noblox.setCookie(process.env.COOKIE)

require('discord-reply');


module.exports = {
	name: 'whois',
	description: 'Checks the user via roblox/discord parts both.',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	execute: async (message, args, client) => {

    const member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || await client.users.fetch(args[0])

    // Getting Data of the user.

    const fetch_eryn = await fetch(`https://verify.eryn.io/api/user/${member.user.id}`);
    const eryn = await fetch_eryn.json();

    if(eryn.status == 'error' && eryn.error == 'User not found.') return message.channel.send('> You are not logged in our roblox database. Please run -verify and follow the instructions. Then try again. Sorry!')

    const fetch_dvf = await fetch(`https://devforum.roblox.com/u/by-external/${eryn.robloxId}.json`);
    const dvf = await fetch_dvf.json();

    const fetch_rbxu = await fetch(`https://users.roblox.com/v1/users/${eryn.robloxId}`);
    const rbxu = await fetch_rbxu.json();

    // Getting the roles of the user.

    const usrole = member.roles.cache.map(r => '<@&'+r.id+'>').join(' ').slice(0,-22)

    // Embeds.

    const hybridRank = await noblox.getRankNameInGroup(6490664, rbxu.id)
    const hisdRank = await noblox.getRankNameInGroup(7314566, rbxu.id)
    const hybridmedia = await noblox.getRankNameInGroup(8987522, rbxu.id)

    const discordem = new MessageEmbed()
      .setDescription(`> <:DISCORD:899063346249220117> **__Discord Information__**\n\n> • **Discord Username:** ${member.user.username}\n> • **Discrim:** ${member.user.discriminator}\n> • **User ID:** ${member.user.id}\n\n> • **Created at:** ${member.user.createdAt}\n> • **Joined at:** ${member.guild.joinedAt}\n\n> • **Roles:** ${usrole}`)
      .setColor('7289DA')
      .setThumbnail(member.user.avatarURL())
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setTimestamp()
    
    const robloxem = new MessageEmbed()
      .addField(`<:ROBLOX:899063057471373312> **__Roblox Information__**`,`\n> • **Roblox Username:** ${rbxu.name}\n> • **Roblox Display Name:** ${rbxu.displayName} \n> • **Roblox ID:** ${rbxu.id}\n\n> • **Description:**\n\n ${rbxu.description}\n\n> • **DevForum Profile:** [Click me!](https://devforum.roblox.com/u/${eryn.robloxUsername})`)
      .addField('<:HYBRID:899061682322669618> Hybrid Roles',`> **Hybrid Incorporated: ${hybridRank}**`, true)
      .setColor('C4281C')
      .setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${eryn.robloxUsername}`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setTimestamp()
    
    const option2 = new MessageMenuOption()
      .setValue('1')
      .setEmoji('899063346249220117')
      .setLabel('Discord Information')
      .setDescription('Shows information about the discord account of the user.')
    
    const option3 = new MessageMenuOption()
      .setValue('2')
      .setEmoji('899063057471373312')
      .setLabel('Roblox Information')
      .setDescription('Shows information about the roblox account of the user.')
    
    const main = new MessageMenu()
      .setID('mhmenu')
      .setPlaceholder('Change to Discord/Roblox information!')
      .addOption(option2)
      .addOption(option3)
    
    const msg = await message.channel.send(discordem, main)
    
    const filter = (menu) => menu.clicker.id === message.author.id;
    const collector = msg.createMenuCollector(filter, { time: 30000 })

    collector.on('collect', (menu) => {
      if(menu.values[0] === '1') {
        menu.reply.defer()
        return menu.message.edit(discordem)
      }
      if(menu.values[0] === '2') {
        menu.reply.defer()
        return menu.message.edit(robloxem)
      }
    })

  }
}