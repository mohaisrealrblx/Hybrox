const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "remotemysql.com",
  database: "u9ifPnhIVG",
  user: "u9ifPnhIVG",
  password: "DOR1N3M1Qs"
})

module.exports = {
	name: 'ss',
	description: 'Get help on how to use the bot and the specific commands',
	aliases: [],
	usage: '[command name]',
	guildOnly: false,
	args: false,
	execute: async (message, args, client) => {

    var sql = `SELECT * FROM HISDSchedule ORDER BY Date ASC`;

    db.query(sql, async function (err, results) {
    if (err) throw err;

    //INSERT INTO HISDSchedule (Date, Host, Notes, Type) VALUES ('1634666400', 'MohaIsReal', 'Notes', 'Banana Training');

    for (var i = 0; i < results.length; i++) {
      var object = results[i]
      
      const embed = new MessageEmbed()
        .setDescription(`> **Time:** <t:${object.Date}:R>\n> **Host:** ${object.Host}\n> **Type:** ${object.Type}\n> **Notes:** ${object.Notes}`)
        .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
        .setColor('1f51ad')
        .setTimestamp()
      
      message.channel.send(embed)
    }
    
    })

    db.end()

    /*const response = await fetch('https://api.trello.com/1/lists/5f8731b94751a555ef30928f/cards?key=a724a97ef85fe7e1b0253251f6d1ef5f&token=aa48a238ffe3800f6abf046ebce1003791c1152b2ce0331400aaada1eb348ab4');
    const result = await response.json();

    https://api.trello.com/1/lists/6144960d9f72473c0a93e375/cards?key=a724a97ef85fe7e1b0253251f6d1ef5f&token=aa48a238ffe3800f6abf046ebce1003791c1152b2ce0331400aaada1eb348ab4*/
    
  }
}