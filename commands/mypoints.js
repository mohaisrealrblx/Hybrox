const Discord = require("discord.js-typing-stop")(require("discord.js"))
const client = new Discord.Client();
require('discord-reply');
const noblox = require("noblox.js")
const fetch = require('node-fetch')
noblox.setCookie(process.env.COOKIE) 

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "remotemysql.com",
  database: "u9ifPnhIVG",
  user: "u9ifPnhIVG",
  password: "DOR1N3M1Qs",
})

module.exports = {
	name: 'mypoints',
	description: 'Checks out your points!',
	aliases: ['?', 'h'],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {

    const dauser = message.author

    var sql = `SELECT * FROM PointsRecord WHERE UserID = ${dauser.id}`;

    db.query(sql, async function (err, results) {
    if (err) throw err;

    if (!results.length) {

       const damember = message.author

       const fetch = require('node-fetch')
       const response = await fetch(`https://verify.eryn.io/api/user/${damember.id}`);
        const data = await response.json();

        var sql1 = `INSERT INTO PointsRecord (UserID, RobloxID, RobloxName) VALUES ('${damember.id}', '${data.robloxId}', '${data.robloxUsername}')`;
        db.query(sql1, function (err, results) {

          console.log(`[MySQL]: A new user has been logged into the database! ${data.robloxUsername} welcome!`)

          const infoembed2 = new Discord.MessageEmbed()
            .setTitle('Points!')
            .setDescription(`> <:hrt:892115066080616529> - You have **${results[0].HRTPoints}** points.\n> <:hisd:893212166583365673> - You have **${results[0].HISDPoints}** points.`)
           .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
           .setColor('1f51ad')
           .setFooter(`Requested by ${results[0].RobloxName}`)
           .setTimestamp()

          return message.channel.send(infoembed2);
        });
    }

    const infoembed = new Discord.MessageEmbed()
        .setTitle('Points!')
        .setDescription(`> <:hrt:892115066080616529> - You have **${results[0].HRTPoints}** points.\n> <:hisd:893212166583365673> - You have **${results[0].HISDPoints}** points.`)
       .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
        .setColor('1f51ad')
        .setFooter(`Requested by ${results[0].RobloxName}`)
        .setTimestamp()

    // If we don't have data of the user.

    /*if (!results.length) return message.channel.send('> **Please run `-verify` to proceed with the points system thank you!')*/

    if (message.author.id === results[0].UserID) {
      message.channel.send(infoembed);    
     }

    // Auto-Rankup when points are detected.

    // Cadet - Grade 1

    if (results[0].HISDPoints > 30 ) {

      const dauser = results[0].UserID
      const darblxid = results[0].RobloxID

      const rankId = await noblox.getRankInGroup(7314566, darblxid)

      if (rankId == 1) {
        if (results[0].HISDPoints > 30 ) {

          const response = await fetch(`https://verify.eryn.io/api/user/${dauser}`);
          const data = await response.json();

          noblox.changeRank(7314566, data.robloxId, 1)
          message.channel.send('> You have been ranked to Grade 1!')

        }
      }
    }

    // Grade 1 - Grade 2

    if (results[0].HISDPoints > 70 ) {

      const dauser = results[0].UserID
      const darblxid = results[0].RobloxID

      const rankId = await noblox.getRankInGroup(7314566, darblxid)

      if (rankId == 5) {
        if (results[0].HISDPoints > 70 ) {

          const response = await fetch(`https://verify.eryn.io/api/user/${dauser}`);
          const data = await response.json();

          noblox.changeRank(7314566, data.robloxId, 1)
          message.channel.send('> You have been ranked to Grade 2!')

        }
      }
    }

    // Grade 2 - Grade 3

    if (results[0].HISDPoints > 120 ) {

      const dauser = results[0].UserID
      const darblxid = results[0].RobloxID

      const rankId = await noblox.getRankInGroup(7314566, darblxid)

      if (rankId == 10) {
        if (results[0].HISDPoints > 120 ) {

          const response = await fetch(`https://verify.eryn.io/api/user/${dauser}`);
          const data = await response.json();

          noblox.changeRank(7314566, data.robloxId, 1)
          message.channel.send('> You have been ranked to Grade 3!')

        }
      }
    }
   })

   db.end();
  }
}