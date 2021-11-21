/*client.on("ready", () => {
    console.log("Ready");
    
    const em = new Discord.MessageEmbed()
      .setTitle('Hybrox Information.')
      .setDescription(`> **__Greetings!__**\n\n> My name is Hybrox, a JS Bot using the Discord.JS framework. This bot has some function, that still a work in progress but they are going to release soon! Also, if you want more information like commands, or use the prefix **${config.prefix}** or use the slash commands for help, that is also coming soon!\n\n> • **Node.JS Version:** v12.22.6\n> • **Discord.JS Version:** 12.5.1\n\n> • **Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} **MB**\n> • **Client Uptime:** ${duration}\n\n> **Designed and programmed by MohaIsReal.**`)
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('1f51ad')
      .setTimestamp()
    
    const divem = new Discord.MessageEmbed()
      .setTitle('Hybrid Incorporated Divisions.')
      .setDescription('> In this section we will show you some of the divisions that you can get into our community. This are **only** the **official subdivisions**. The unofficial will not appear here.\n\n> **__Hybrid Incorporated Security Division__** (H.I.S.D.)\n> • **Roblox Link:** https://www.roblox.com/groups/7314566\n> • **Discord:** https://discord.gg/cQBfRw4Zss\n\n> **__Hybrid Media__**\n> • **Roblox Link:** https://www.roblox.com/groups/8987522\n> • **Discord:** https://discord.gg/gFkfgYceEt')
      .setAuthor('Hybrox','https://cdn.discordapp.com/icons/707690929003167845/37c2b5c4257351d3f5f20d704e1ebdc1.png?size=96')
      .setColor('YELLOW')
      .setTimestamp()
    
    slash.command({
        guildOnly: true,
        guildID: "891329720510197790",
        data: {
            name: "info",
            description: "Sends a message with information about the bot.",
            type: 4,
            content: ` `,
            embeds: [em]
        }
    })
    slash.command({
        guildOnly: true,
        guildID: "891329720510197790",
        data: {
            name: "divisions",
            description: "Show the information about all the official divisions of Hybrid.",
            type: 4,
            content: ` `,
            embeds: [divem]
        }
    })
})*/