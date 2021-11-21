const Discord = require("discord.js");
const client = new Discord.Client();
require('discord-reply');

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "remotemysql.com",
  database: "u9ifPnhIVG",
  user: "u9ifPnhIVG",
  password: "DOR1N3M1Qs",
  connectTimeout: 10000
})

module.exports = {
	name: 'adminlist',
	description: 'Get help on how to use the bot and the specific commands',
	aliases: ['al', 'h'],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {

    let lettotrs = { 
        "0": "<a:THIS_DOWN:900421583426977822>",
        "1": "<a:THIS_UP:899067696908492811>"
      } 

    const noacembed = new Discord.MessageEmbed()
      .setColor('B60E00')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setTimestamp()

    let author = message.author

    var sql = `SELECT * FROM PermissionsRecord ORDER BY RobloxName ASC`

    db.query(sql, function (err, results) {
    if (err) throw err;

    for (var i = 0; i < results.length; i++) {
      var object = results[i]
      
      const alembed = new Discord.MessageEmbed()
        .setDescription(`**__Administrative Information__**\n\n> **Username:** ${object.RobloxName}\n> **Is HIAA?:** ${lettotrs[object.HIAA]}\n> **Is HISD HR?:** ${lettotrs[object.HISDHR]}`)
        .setColor('1f51ad')
        .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
        .setTimestamp()
    
      message.channel.send(alembed)
      }
    })

    db.end()
  }
}