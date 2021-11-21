const { MessageEmbed, Client } = require("discord.js")
const disbut = require("discord-buttons");
const disbutpages = require("discord-buttons-pages")
const fetch = require('node-fetch')
require('discord-reply')

const client = new Client();

module.exports = {
	name: 'gs',
	description: 'idk',
	aliases: ['groupstats', 'gstats'],
	usage: '.gm',
	guildOnly: false,
	args: false,
	execute: async (message, args, client) => {

    const fetch_hybrid = await fetch('https://groups.roblox.com/v1/groups/6490664');
    const hybrid = await fetch_hybrid.json();

    const fetch_hisd = await fetch('https://groups.roblox.com/v1/groups/7314566');
    const hisd = await fetch_hisd.json();

    const fetch_hm = await fetch('https://groups.roblox.com/v1/groups/8987522');
    const hm = await fetch_hm.json();

    const hybridbtn = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Hybrid Incorporated.')
      .setEmoji('🔭')
      .setURL('https://roblox.com/groups/6490664')

    const hisdbtn = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('H.I.S.D.')
      .setEmoji('👮')
      .setURL('https://roblox.com/groups/7314566')

    const hmbtn = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Hybrid Media')
      .setEmoji('🎥')
      .setURL('https://roblox.com/groups/8987522')

    const em = new MessageEmbed()
      .setDescription(`> **__Group Stats.__**\n\n> **Hybrid Incorporated.** - ${hybrid.memberCount} members.\n> • **Shout made by ${hybrid.shout.poster.username}:** ${hybrid.shout.body}\n\n> **H.I.S.D.** - ${hisd.memberCount} members.\n>  • **Shout made by ${hisd.shout.poster.username}:** ${hisd.shout.body}\n\n> **Hybrid Media** - ${hm.memberCount} members.\n>  • **Shout made by ${hm.shout.poster.username}:** ${hm.shout.body}`)     .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()

    message.channel.send(em, { buttons: [ hybridbtn, hisdbtn, hmbtn ] } )
  }
}