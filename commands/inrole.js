const  { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'inrole',
	description: 'Checks all the people who has a chosen role.',
	aliases: ["members"],
	usage: '',
	guildOnly: false,
	args: false,
	execute: (message, args, client) => {

    const role = message.mentions.roles.firts || message.guild.roles.cache.get(args[0])

    if (!role) return message.channel.send("> <a:cross:805828442247528468> ;; You need to put the role ID.");

    const membersxd = role.members.filter((x) => x.user.tag !== message.guild.id).map((x) => `<@${x.user.id}>`)

    const listaRoles = membersxd.length > 25 ? `${membersxd.slice(0, 25).join('\n')}\nand ${membersxd.length - 25} more members` : membersxd.join('\n');


    const embedInRole = new MessageEmbed()
      .setTitle(`Members with the role:\n\**${role.name}\** - \**${role.members.size}\**`)
      .setDescription(listaRoles)
      .setColor(role.hexColor)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setTimestamp()
    message.channel.send(embedInRole);
  }
}