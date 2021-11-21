const Discord = require('discord.js')
require('discord-reply')
const client = new Discord.Client();

var Trello = require("trello");
var trello = new Trello(process.env.TAPIKEY, process.env.TTOKEN);

module.exports = {
	name: 'ban',
	description: 'bannnnn',
	aliases: [],
	usage: ';ban',
	guildOnly: true,
  execute: async (message, args, client) => {

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setFooter(message.guild.name, message.guild.iconURL())

    if (!args[0]) { return message.channel.send('> <a:cross:805828442247528468> ;; You have to mention someone!').then(m => m.delete({ timeout: 5000 }))}


    const member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || await client.users.fetch(args[0])


    if (!member || member.id == message.author.id) { return message.channel.send('> <a:cross:805828442247528468> ;; You have to mention someone!').then(m => m.delete({ timeout: 10000 }))}

    if (!message.member.permissions.has('BAN_MEMBERS')) { return message.channel.send("> <a:cross:805828442247528468> ;; You're not allowed to use this command.").then(m => m.delete({ timeout: 10000 }))}

    if (message.guild.members.resolve(member.id)) { 
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) { return message.channel.send("> <a:cross:805828442247528468> ;; You may not ban a user with a higher or equal hierarchy level than you.").then(m => m.delete({ timeout: 10000 }))}

    if (!member.bannable) { return message.channel.send("> <a:cross:805828442247528468> ;; I can't ban that user. :(").then(m => m.delete({ timeout: 10000 }))}

    let reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : `Reason unspecified.`
    message.guild.members.ban(member.id, { reason: `Reason: ${reason}\nBanned by: ${message.author.username}` })

    embed.setThumbnail(!!member.user ? member.user.displayAvatarURL() : member.displayAvatarURL())
    embed.setDescription(`**__Ban Protocol.__**\n\n> **User:** ${member.user.username}\n> **Reason:** ${reason}\n> **Moderator:** ${message.author.username}\n\n> **BAN LOGGED INTO THE DATABASE.**`)
    embed.setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
    embed.setColor('1f51ad')
    embed.setTimestamp()

    console.log(`${member.user.id} banned.`)

    if (!!member.user) member.user.send(embed).catch(e => e);

    //61707123a1e1354f23f8b2af

    trello.addCard('Discord Moderation Log', `**__Ban Protocol.__**\n\n> **User:** ${member.user.username}\n> **Reason:** ${reason}\n> **Moderator:** ${message.author.username}\n\n> **BAN LOGGED INTO THE DATABASE.**`, "61707123a1e1354f23f8b2af",
      function (error, trelloCard) {
          if (error) {
              console.log('Could not add card:', error);
          }
          else {
              console.log('Added card:', trelloCard);
          }
      });


    message.channel.send(embed) 
  }
  }
}
