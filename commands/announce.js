const Discord = require("discord.js-typing-stop")(require("discord.js"))
const client = new Discord.Client();
require('discord-reply');

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "remotemysql.com",
  database: "u9ifPnhIVG",
  user: "u9ifPnhIVG",
  password: "DOR1N3M1Qs"
})

module.exports = {
	name: 'announce',
	description: 'It announces messages that you want with the bot.',
	aliases: ['', ''],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {

    const user = message.author

    let channel = message.mentions.channels.first()
    let anuncio = args.slice(1).join(" ");

    var sql = `SELECT * FROM PermissionsRecord WHERE UserID = '${user.id}'`;

    db.query(sql, function (err, results) {
    if (err) throw err;

    if (!results.length) return message.lineReplyNoMention('> **Not allowed.**')

    if (message.author.id === results[0].UserID) {

      const dauser = message.author

      const infoembed = new Discord.MessageEmbed()
      .setDescription(anuncio)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setFooter(`Written by ${results[0].RobloxName}`)
      .setTimestamp()
     channel.send(infoembed);    
     }
   })
  }
}