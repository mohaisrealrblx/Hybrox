const Discord = require('discord.js')

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "remotemysql.com",
  database: "u9ifPnhIVG",
  user: "u9ifPnhIVG",
  password: "DOR1N3M1Qs"
})

module.exports = {
	name: 'viewpoints',
	description: 'Checks the points in other people.',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	execute: (message, args, client) => {

    var dauser = message.author
    const vpuser = args[0]
    const division = args[1]

    if (!vpuser) return message.channel.send('> Bruh where is the user.')
    if (!division) return message.channel.send('> and the division???? >:|')

    var sql = `SELECT * FROM PermissionsRecord WHERE UserID = ${dauser.id}`

    db.query(sql, function (err, results) {
    if (err) throw err;

    if (division == 'hisd') {
      if (results[0].HISDHR == 1) {

      var sql1 = `SELECT * FROM PointsRecord WHERE RobloxName = ${vpuser}`
      db.query(sql1, function (err, results) {

        const thembed = new Discord.MessageEmbed()
          .setDescription(`> **__H.I.S.D. Points of ${vpuser}__**\n\n> <:hisd:893212166583365673> - **${results[0].HISDPoints} points.**`)
          .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
          .setColor('1f51ad')
          .setTimestamp()

      })
    } else { return message.channel.send('> Not allowed.') }
    } else if (division == 'hrt') {
      if (results[0].HRTHR == 1) {

      var sql1 = `SELECT * FROM PointsRecord WHERE RobloxName = ${vpuser}`
      db.query(sql1, function (err, resultss) {

        const thembed = new Discord.MessageEmbed()
          .setDescription(`> **__H.R.T. Points of ${vpuser}__**\n\n> <:hisd:893212166583365673> - **${results[0].HRTPoints} points.**`)
          .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
          .setColor('1f51ad')
          .setTimestamp()

      })} else { return message.channel.send('> **Not allowed.**') }
    }
  })
 }
}