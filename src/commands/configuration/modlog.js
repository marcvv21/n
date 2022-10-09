const { MessageEmbed, Permissions } = require("discord.js")
const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')
const prefixSchema = require("../../database/prefix");
const modlogSchema = require('../../database/modlog')
const { botprefix } = require('../../../config.json')

module.exports.run = async (client, message, args) => {

  const prefixData = await prefixSchema.findOne({
    GuildID: message.guild.id,
  }).catch(err => console.log(err))

  if (prefixData) {
    var guildprefix = prefixData.Prefix
  } else if (!prefixData) {
    guildprefix = botprefix
  }

  const data = await modlogSchema.findOne({
    GuildID: message.guild.id,
  });

  const modlogchannel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[1])

  if (!args[0]) {

  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)
    
  const embed = new MessageEmbed()

  .setColor(color)
  .setTitle('raunt modlogs')
  .setDescription(`\`\`\`enable the modlog by using ${guildprefix}modlog enable <mention/id>\n\ndisable the modlog by using ${guildprefix}modlog disable\`\`\``)

  .setFooter('raunt modlogs')
        
  return message.channel.send({ embeds: [embed] })
  }

  if (args[0] === 'enable') {

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)

    if (!modlogchannel || modlogchannel.type !== 'GUILD_TEXT') return message.channel.send(`You forgot to provide a channel`)

    if (data) {
    await modlogSchema.findOneAndRemove({
      GuildID: message.guild.id,
    });

    let newData = new modlogSchema({
      Modlog: modlogchannel.id,
      GuildID: message.guild.id,
    });
    newData.save();

    message.channel.send(`Successfully set the modlog to **${modlogchannel.name}**`)
  } else if (!data) {
  
    let newData = new modlogSchema({
      Modlog: modlogchannel.id,
      GuildID: message.guild.id,
    });
    newData.save();

    message.channel.send(`Successfully set the modlog to **${modlogchannel.name}**`)
   }
  }

  if (args[0] === 'disable') {

  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)

  const data = await modlogSchema.findOne({
    GuildID: message.guild.id,
  });

  if (data) {
    await modlogSchema.findOneAndRemove({
      GuildID: message.guild.id,
    });

  message.channel.send('Successfully disabled modlog')
  }
  }
}

module.exports.config = {
  name: "modlog",
  aliases: [],
  description: 'Views how to setup modlog',
  parameters: '',
  permissions: 'ADMINISTRATOR',
  syntax: 'modlog [command]',
  example: 'modlog disable'
}