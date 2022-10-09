const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')
const { MessageEmbed, Permissions } = require("discord.js")
const autoroleSchema = require('../../database/autorole')
const { botprefix } = require('../../../config.json')
const prefixSchema = require("../../database/prefix");

module.exports.run = async (client, message, args) => {

  const prefixData = await prefixSchema.findOne({
    GuildID: message.guild.id,
  }).catch(err => console.log(err))

  if (prefixData) {
    var guildprefix = prefixData.Prefix
  } else if (!prefixData) {
    guildprefix = botprefix
  }

  if (!args[0]) {

  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)
    
  const embed = new MessageEmbed()

  .setColor(color)
  .setTitle('autorole')
 .setDescription(`\`\`enable the autorole by using ${guildprefix}autorole enable <mention/id>\`\`\n\n\`\`disable the autorole by using ${guildprefix}autorole disable\`\``)
  .setFooter('raunt autorole')
        
  return message.channel.send({ embeds: [embed] })
  }

  if (args[0] === 'enable') {

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
  
    if(!role) return message.channel.send('You need to provide a role.')

    autoroleSchema.findOne({ GuildID: message.guild.id }, async(err, data) => {
    if(data) {
      data = new autoroleSchema({
        RoleID: role.id,
        GuildID: message.guild.id,
      })
      data.save()
      message.channel.send(`Successully enabled autorole as **${role.name}**`)
    } else {
      data = new autoroleSchema({ 
        RoleID: role.id,
        GuildID: message.guild.id, 
      })
      data.save()    
      message.channel.send(`Successully enabled autorole as **${role.name}**`)   
    }
    }) 
  }

  if (args[0] === 'disable') {

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions.`)

    if (data) {
    await autoroleSchema.findOneAndRemove({
      GuildID: message.guild.id,
    });

    return message.channel.send('Successfully disabled the autorole')

    } else if (!data) {

      return message.channel.send('No autorole exists!')
    }
  }
}

module.exports.config = {
  name: "autorole",
  aliases: [],
  description: 'Views how to setup auto-role',
  parameters: '',
  permissions: 'ADMINISTRATOR',
  syntax: 'autorole [command]',
  example: 'autorole disable'
}