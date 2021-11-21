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
	name: 'setpointsor',
	description: 'Get help on how to use the bot and the specific commands',
	aliases: ['?', 'h'],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {

    let user = args[0]
    let division = args[1].toLowerCase()
    let points = args[2];
    
    if (!message.member.permissions.has('MANAGE_SERVER')) return;

    if (division == 'hrt') {
    
    var sql = `UPDATE PointsRecord SET HRTPoints = '${points}' WHERE RobloxName = '${user}'`;
    db.query(sql)

    const infoembed = new Discord.MessageEmbed()
      .setTitle('Points System.')
      .setDescription(`> Sucessfully set points to **${points}** to the user ${user}`)
      .setThumbnail('https://media.discordapp.net/attachments/623995288503451648/894233884840050698/1633272325460.png?width=427&height=427')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    message.lineReplyNoMention(infoembed)
    } else if (division == 'hisd') {
    
    var sql = `UPDATE PointsRecord SET HISDPoints = '${points}' WHERE RobloxName = '${user}'`;
    db.query(sql)

    const infoembed = new Discord.MessageEmbed()
      .setTitle('Points System.')
      .setDescription(`> Sucessfully set points to **${points}** to the user ${user}`)
      .setThumbnail('https://media.discordapp.net/attachments/739596388689641503/892395256438476800/HISDlogo_4.png?width=427&height=427')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    message.lineReplyNoMention(infoembed)
    }
  }
}