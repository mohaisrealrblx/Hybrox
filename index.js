const fs = require('fs');
const keepAlive = require('./server.js');
const rbxcomm = require('./rfile.js')
const config = require('./utils/config.json')

const moment = require('moment');

const rlp = require("roblox-long-polling")
const poll = new rlp({
  port: "5000"
})

poll.on('connection', (connection) => {
  console.log('[RBLX] New connection: ', connection.id);
  poll.broadcast("[RBLX] New connection", connection.id);
    
  connection.on('hello', (data) => {
    console.log("received hello message!", data)
  })  
})

var mysql = require('mysql');
const db = mysql.createConnection({
  host: "remotemysql.com",
  database: "u9ifPnhIVG",
  user: "u9ifPnhIVG",
  password: "DOR1N3M1Qs"
})

const Discord = require('discord.js');
const { Slash } = require('discord-slash-commands');
const client = new Discord.Client();
const slash = new Slash(client);

const disbut = require('discord-buttons')(client);

/*const noblox = require('noblox.js')
async function startApp () {
    const currentUser = await noblox.setCookie(process.env.COOKIE) 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)
}

startApp()*/

// Moment Zone.

require("moment-duration-format");
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
	const eventHandler = require('./handler/eventHandler.js');
	eventHandler(err, files, client);
});
fs.readdir('./commands/', (err, files) => {

	const commandHandler = require('./handler/commandHandler.js');
	commandHandler(err, files, client);
});

const { MessageButton } = require('discord-buttons')

client.on('clickButton', async (button) => {

  const confirmBtn1 = new MessageButton()
    .setLabel('Get it!')
    .setStyle('green')
    .setID('confirmbtn1')
        
  const removeBtn1 = new MessageButton()
    .setLabel('Remove it!')
    .setStyle('red')
    .setID('removebtn1')

  if(button.id == 'confirmbtn1') {
    button.reply.send("> Role added! Enjoy!", true)
    const role = button.guild.roles.cache.get("891646658276892723")
    const member = button.clicker.member
    await member.roles.add(role)
  }

  if(button.id == 'removebtn1') {
    button.reply.send("> Role removed! Enjoy!", true)
    const role = button.guild.roles.cache.get("891646658276892723")
    const member = button.clicker.member
    await member.roles.remove(role)
  }

  // Patrol announcement.

  const confirmBtn2 = new MessageButton()
    .setLabel('Get it!')
    .setStyle('green')
    .setID('confirmbtn2')
        
  const removeBtn2 = new MessageButton()
    .setLabel('Remove it!')
    .setStyle('red')
    .setID('removebtn2')

        if(button.id == 'confirmbtn2') {
          button.reply.send("> Role added! Enjoy!", true)
          const role = button.guild.roles.cache.get("891646604979888159")
          const member = button.clicker.member
          await member.roles.add(role)
        }

        if(button.id == 'removebtn2') {
          button.reply.send("> Role removed! Enjoy!", true)
          const role = button.guild.roles.cache.get("891646604979888159")
          const member = button.clicker.member
          await member.roles.remove(role)
        }
  
  // Backup Request.

  const confirmBtn3 = new MessageButton()
    .setLabel('Get it!')
    .setStyle('green')
    .setID('confirmbtn3')
        
  const removeBtn3 = new MessageButton()
    .setLabel('Remove it!')
    .setStyle('red')
    .setID('removebtn3')

        if(button.id == 'confirmbtn3') {
          button.reply.send("> Role added! Enjoy!", true)
          const role = button.guild.roles.cache.get("891647238105862206")
          const member = button.clicker.member
          await member.roles.add(role)
        }

        if(button.id == 'removebtn3') {
          button.reply.send("> Role removed! Enjoy!", true)
          const role = button.guild.roles.cache.get("891647238105862206")
          const member = button.clicker.member
          await member.roles.remove(role)
        }
  
  if(button.id == 'SupReq') {
    button.reply.defer()
    const member = button.clicker.member
    button.guild.channels.create(`SP - ${member.id}`, {
            type: 'text',
            reason: `Support command requested by ${member.id}`,
            topic: `:exclamation: ;; **__Support Command__**\n\n • Requested by <@${member.id}>\n • This channel is only for support. Please wait for a staff memeber to help you.\n\n**Thanks for using Hybrox Support. Have a nice day.**`,
            permissionOverwrites: [{
              id: member.id,
              allow: ['VIEW_CHANNEL'],
            },
            {
              id: '891374216778244126',
              deny: ['VIEW_CHANNEL']
            }]
        });
  }
  
  if(button.id == 'TrainingRR') {
    button.reply.send("> You have choosed **Training Announcements** role. What do you want to do, **get it**? Or **remove it**?", { buttons: [ confirmBtn1, removeBtn1 ], ephemeral: true })}
  if(button.id == 'PatrolRR') {
    button.reply.send("> You have choosed **Patrol Announcements** role. What do you want to do, **get it**? Or **remove it**?", { buttons: [ confirmBtn2, removeBtn2 ], ephemeral: true })}
  if(button.id == 'BackupRR') {
    button.reply.send("> You have choosed **Backup Requests** role. What do you want to do, **get it**? Or **remove it**?", { buttons: [ confirmBtn3, removeBtn3 ], ephemeral: true })}

});

/*client.ws.on("INTERACTION_CREATE", async (interaction) => {

  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;

  if (command === 'mypoints') {

    if(args.division == 'all') {

      const dauser = interaction.user;

    var sql = `SELECT * FROM PointsRecord WHERE UserID = ${dauser.id}`;

    db.query(sql, async function (err, results) {
    if (err) throw err;

    const embed = new Discord.MessageEmbed()
        .setTitle('Points!')
        .setDescription(`> <:hrt:892115066080616529> - You have **${results[0].HRTPoints}** points.\n> <:hisd:893212166583365673> - You have **${results[0].HISDPoints}** points.`)
       .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
        .setColor('1f51ad')
        .setFooter(`Requested by ${results[0].RobloxName}`)
        .setTimestamp()

    if (interaction.user.id === results[0].UserID) {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            embeds: [embed]
          }
        }
      })
     }
    })
    }
  }
})*/

/*function checkScheduler() {
  var sql = `SELECT Date FROM HISDScheduler ORDER BY Date ASC`
  db.query(sql, function(err,results) {
    for (var i = 0; i < results.length; i++) {
      var object = results[i]
      
      if(object.Date < moment().unix()) {
        var sql1 = `DELETE FROM HISDScheduler WHERE Date = ${object.Date}`
        db.query(sql1)
        console.log(`[HISD Scheduler] Event with date: ${object.Date} and with host: ${object.Host} has been deleted from the database.`)
      }
    }
  })
} 

setInterval(checkscheduler, 5000);*/

keepAlive();
client.login(process.env.TOKEN)