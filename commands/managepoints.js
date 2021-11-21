const Discord = require("discord.js");
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
	name: 'managepoints',
	description: '',
	aliases: ['mp', 'editpoints'],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {

    const cancelem = new Discord.MessageEmbed()
      .setDescription(`> **__You canceled the prompt.__**`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('D63838')
      .setTimestamp()

    const tmt = new Discord.MessageEmbed()
      .setDescription(`> **__You took too many time to answer!__**`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('D63838')
      .setTimestamp()

    const userMessage = new Discord.MessageEmbed()
      .setDescription(`> **__Welcome to Administration Points System__**\n\n> Here you can administrate the points of any user in  the database, to get his points, or any data that you think that is relevant. Please state the Roblox User Nickname.\n\n> **NOTE:** During this process, if you want to cancel this procedure, state ***cancel*** and will cancel the prompt.`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    const divEmbed = new Discord.MessageEmbed()
      .setDescription(`> Now, please **choose the division** that you are going to modify the points. **Remember!** If you are not an HR on that division, you will not have access and this prompt will be closed!`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    const asEmbed = new Discord.MessageEmbed()
      .setDescription(`> Now, please **say if you want to add or subtract** points!`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    const ptsEmbed = new Discord.MessageEmbed()
      .setDescription(`> **__Point Stage!__**\n\n> Finally the last stage! How much points do you want to add/deduct, depending on your choice in the last prompt.`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    const fembed = new Discord.MessageEmbed()
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()


    const user = message.author

    var sql = `SELECT * FROM PermissionsRecord WHERE UserID = '${user.id}'`;
    db.query(sql, async function (err, results) {
    if (err) throw err;

    if (!results.length) return message.lineReplyNoMention('> **Not allowed.**')

    const channel = message.channel
    const filtro = msg => msg.author.id === message.author.id; 

    const user_message = await message.channel.send(userMessage)

    const umarray = await channel.awaitMessages(filtro, {max: 1, time: 20000})
    if(umarray.size < 1) return message.channel.send(tmt).then(m => m.delete({ timeout: 5000 }))
          
    const result_umarray = await umarray.first().content;
           
    if(result_umarray === 'cancel') {
      user_message.delete()
      message.delete()
      return message.channel.send(cancelem).then(m => m.delete({ timeout: 10000 }))
    }

    var sql = `SELECT * FROM PointsRecord WHERE RobloxName = '${result_umarray}'`;
    db.query(sql, async function (err, results) {
    if (err) throw err;

    const cmem = new Discord.MessageEmbed()
      .setDescription(`> **__Confirmation Request__**\n\n> Is this the user that you are searching for?\n\n> • **Roblox Username:** ${results[0].RobloxName}\n> • **Roblox ID:** ${results[0].RobloxID}\n\n> • **H.I.S.D. Points:** ${results[0].HISDPoints}\n> • **H.R.T. Points:** ${results[0].HRTPoints}`)
      .setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${results[0].RobloxName}`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()

    const cu_msg = await user_message.edit(cmem)

    const cuarray = await channel.awaitMessages(filtro, {max: 1, time: 30000})
    if(cuarray.size < 1) return message.channel.send(tmt).then(m => m.delete({ timeout: 5000 }))
          
    let result_cuarray = await cuarray.first().content; 
           
    if(result_cuarray === 'cancel') {
      cu_msg.delete()
      message.delete()
      return message.channel.send(cancelem).then(m => m.delete({ timeout: 10000 }))
    }

    if(result_cuarray === 'yes') {

      const div_msg = await cu_msg.edit(divEmbed)

      const divarray = await channel.awaitMessages(filtro, {max: 1, time: 30000})
      if(divarray.size < 1) return message.channel.send(tmt).then(m => m.delete({ timeout: 5000 }))
          
      let result_divarray = await divarray.first().content.toLowerCase();
           
      if(result_cuarray === 'cancel') {
        cu_msg.delete()
        message.delete()
        return message.channel.send(cancelem).then(m => m.delete({ timeout: 10000 }))
      }

      const dauser = message.author
      var sql = `SELECT * FROM PermissionsRecord WHERE UserID = '${dauser.id}'`;
      db.query(sql, async function (err, results) {
      if (err) throw err;

      if(result_divarray == 'hisd') {
        if(results[0].HISDHR == '1') {

          const as_msg = await div_msg.edit(asEmbed)

          const asarray = await channel.awaitMessages(filtro, {max: 1, time: 30000})
          if(asarray.size < 1) return message.channel.send(tmt).then(m => m.delete({ timeout: 5000 }))
          
          const result_asarray1 = await asarray.first().content.toLowerCase();
           
          if(result_asarray1 === 'cancel') {
            as_msg.delete()
            message.delete()
            return message.channel.send(cancelem).then(m => m.delete({ timeout: 10000 }))
          }

          const pts_msg = await as_msg.edit(ptsEmbed)

          const ptsarray = await channel.awaitMessages(filtro, {max: 1, time: 30000})
          if(ptsarray.size < 1) return message.channel.send(tmt).then(m => m.delete({ timeout: 5000 }))
          
          const result_ptsarray = await ptsarray.first().content;
           
          if(result_ptsarray === 'cancel') {
            as_msg.delete()
            message.delete()
            return message.channel.send(cancelem).then(m => m.delete({ timeout: 10000 }))
          }

          var sql = `SELECT * FROM PointsRecord WHERE RobloxName = '${result_umarray}'`;
          db.query(sql, async function (err, results) {
          if (err) throw err;

          if(result_asarray1 == 'add') {

            var sql1 = `UPDATE PointsRecord SET HISDPoints = ${results[0].HISDPoints}+${result_ptsarray} WHERE RobloxName = '${result_umarray}'`
            db.query(sql1)

            fembed.setDescription(`> **__Points added!__**\n\n> The points have been administrated! Now **${result_umarray}** has ${results[0].HISDPoints} + ${result_ptsarray}`)

            return as_msg.edit(fembed)
            channel.bulkDelete('5')

          } else if(result_asarray1 == 'subtract') {

            var sql1 = `UPDATE PointsRecord SET HISDPoints = ${results[0].HISDPoints}-${result_ptsarray} WHERE RobloxName = '${result_umarray}'`
            db.query(sql1)

            fembed.setDescription(`> **__Points subtracted!__**\n\n> The points have been administrated! Now **${result_umarray}** has ${results[0].HISDPoints} - ${result_ptsarray}`)
            
            return as_msg.edit(fembed)

          }
          
          })

        } else { return message.channel.send('> Not allowed.') }
      } else if(result_divarray == 'hrt') {
        if(results[0].HRTHR == '1') {
          
        } else { return message.channel.send('> Not allowed.') }
      }
      
      })
    }
    
    })
    
    })
  }
}