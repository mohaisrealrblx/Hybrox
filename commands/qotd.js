const { MessageEmbed } = require('discord.js')

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "remotemysql.com",
  database: "u9ifPnhIVG",
  user: "u9ifPnhIVG",
  password: "DOR1N3M1Qs"
})

module.exports = {
	name: 'qotd',
	description: 'Its.. something.',
	aliases: ['questionoftheday'],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
    
    const cancelem = new Discord.MessageEmbed()
      .setDescription(`> **__You canceled the prompt.__**`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('D63838')
      .setTimestamp()
    
    const channel = message.channel
    const filtro = msg => msg.author.id === message.author.id; 
    
    const qotd1_msg = await message.channel.send(qotd1em)

    const qotd1array = await channel.awaitMessages(filtro, {max: 1, time: 30000})
    if(cuarray.size < 1) return message.channel.send(tmt).then(m => m.delete({ timeout: 5000 }))
          
    let result_qotd1array = await qotd1array.first().content; 
           
    if(result_qotd1array === 'cancel') {
      cu_msg.delete()
      message.delete()
      return message.channel.send(cancelem).then(m => m.delete({ timeout: 10000 }))
    }

    const thread = await channel.threads.create({
	    name: 'food-talk',
	    autoArchiveDuration: 604800,
	    reason: 'QOTD',
    });

    
  }
}