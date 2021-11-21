  const Discord = require("discord.js");
const client = new Discord.Client();
require('discord-reply');

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "sql4.freesqldatabase.com",
  user: "sql4440275",
  database: "sql4440275",
  password: "zJBKeVrxrR"
});

module.exports = {
	name: 'addpoints',
	description: 'Get help on how to use the bot and the specific commands',
	aliases: ['?', 'h'],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {

    const user = args[0];
    const dependenci = args[1];
    const points = args[2];
    
    if (!message.member.permissions.has('MANAGE_SERVER')) return;
      
    var sql = `SELECT * FROM PointsRecord WHERE RobloxName = '${user}'`
    
    db.query(sql, function (err, results) {
    if (err) throw err;
    
    const dauser = results[0].UserID

    if (dependenci == 'add') {
      var sql1 = `UPDATE PointsRecord SET HISDPoints = ${results[0].HISDPoints}+${points} WHERE RobloxName = '${user}'`
    db.query(sql1)
    }

    if (dependenci == 'subtract') {
      var sql1 = `UPDATE PointsRecord SET HISDPoints = ${results[0].HISDPoints}-${points} WHERE RobloxName = '${user}'`
    db.query(sql1)
    }
    
    })

    const infoembed = new Discord.MessageEmbed()
      .setTitle('Points System.')
      .setDescription(`> Sucessfully set points to **${points}**`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    message.lineReplyNoMention(infoembed)
  }
}