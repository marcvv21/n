const { Client, MessageEmbed } = require("discord.js")
const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')

module.exports = { 
  config: {   
    name: "about", 
    aliases: ['botinfo'], 
    description: "", 
    sub: "", 
    example: "botinfo", 
    syntax: "botinfo", 
    permissions: "" 
  }, 
run: async (client, message, args) => { 
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
  
  const embed = new MessageEmbed()
  .setAuthor(`${client.user.username}`,client.user.displayAvatarURL())
  .setDescription("Developed & Maintained by [Zaaak#1337](https://discord.gg/wiggles)")
  .setColor(color)
  .addFields(
    {
      name: "<:Members:952154893987242015> Stats",
      value: `
**Server:** ${client.guilds.cache.size}
**Users:** ${client.guilds.cache.reduce(
(prev, guild) => prev + guild.memberCount, 0)}
**Shard:** 0`,
      inline: false
    },
    {
      name: "<:time:952154891323867166> Server",
      value: `
**Node.js**: ${process.versions.node}
**Discord.js**: v13.1.0
**Memory**: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}%
**Commands**: ${client.commands.size}`,
      inline: false
    }
  )
  .setFooter(`Uptime: ${hours}h ${minutes}m ${seconds}s`)
  .setTimestamp()
  message.reply({ embeds: [embed] })
  } 
}