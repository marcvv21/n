const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')
const { MessageEmbed, Permissions } = require("discord.js")
const prefixSchema = require("../../database/prefix");
const messagelogSchema = require('../../database/messagelog')
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

  const data = await messagelogSchema.findOne({
    GuildID: message.guild.id,
  });

  const messagelogchannel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[1])

  if (!args[0]) {

  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)
    
  const embed = new MessageEmbed()

  .setColor(color)
  .setTitle('raunt messagelog')
  .setDescription(`enable the messagelog by using ${guildprefix}messagelog enable <mention/id>\n\ndisable the messagelog by using ${guildprefix}messagelog disable`)
  .setFooter('raunt messagelog')
        
  return message.channel.send({ embeds: [embed] })
  }

  if (args[0] === 'enable') {

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)

    if (!messagelogchannel || messagelogchannel.type !== 'GUILD_TEXT') return message.channel.send(`You forgot to provide a channel`)

    if (data) {
    await messagelogSchema.findOneAndRemove({
      GuildID: message.guild.id,
    });

    let newData = new messagelogSchema({
      Messagelog: messagelogchannel.id,
      GuildID: message.guild.id,
    });
    newData.save();

    message.channel.send(`Successfully set the messagelog to **${messagelogchannel.name}**`)
  } else if (!data) {
  
    let newData = new messagelogSchema({
      Messagelog: messagelogchannel.id,
      GuildID: message.guild.id,
    });
    newData.save();

    message.channel.send(`Successfully set the messagelog to **${messagelogchannel.name}**`)
   }
  }

  if (args[0] === 'disable') {

  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)

  const data = await messagelogSchema.findOne({
    GuildID: message.guild.id,
  });

  if (data) {
    await messagelogSchema.findOneAndRemove({
      GuildID: message.guild.id,
    });

  message.channel.send('Successfully disabled messagelog')
  }
  }
}

module.exports.config = {
  name: "messagelog",
  aliases: [],
  description: 'Views how to setup messagelog',
  parameters: '',
  permissions: 'ADMINISTRATOR',
  syntax: 'messagelog [command]',
  example: 'messagelog disable'
}