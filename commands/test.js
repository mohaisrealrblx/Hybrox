const { MessageButton } = require('discord-buttons');
const Discord = require('discord.js');

module.exports = {
	name: 'test',
	description: 'Just a test command',
	aliases: [],
	usage: '',
	guildOnly: false,
	args: false,
	permissions: {
		user: ['MANAGE_SERVER'],
	},
	execute: (message, args, client) => {

		message.delete();
    if (!message.member.permissions.has('MANAGE_SERVER')) return;

    /*const mainembed = new Discord.MessageEmbed()
        .setTitle('Button Roles')
        .setDescription('> Welcome to Button Roles! Here we have so many roles that you can get. Just click on the buttons to get the determinated role. Here is a definition of the roles. There\'s also the definiton of the buttons below.  \n\n> 🚄 ;; Training Announcement. \n> 🚔 ;; Patrol Announcement. \n> 🚨 ;; Backup Request. \n\n> To get those roles, you will need to press the button of the role that you want to get, then confirm if you want to get it, or remove it from your profile. \n\n> And that\'s all! Have fun!')
        .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      
      let trainingrr = new MessageButton()
        .setLabel("Training Ann.")
        .setStyle("green")
        .setID("TrainingRR")
      
      let patrolrr = new MessageButton()
        .setLabel("Patrol Ann.")
        .setStyle("green")
        .setID("PatrolRR")

      let backuprr = new MessageButton()
        .setLabel("Backup Request.")
        .setStyle("green")
        .setID("BackupRR")

      message.channel.send({ buttons: [ trainingrr, patrolrr, backuprr ], embed: mainembed })*/

      const mainembed = new Discord.MessageEmbed()
	},
}
