const { pagination } = require("reconlx")
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { botprefix, support, invite, upvote } = require('../../../config.json')
const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')
const prefixSchema = require("../../database/prefix");

module.exports.run = async (client, message, args) => {

  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

  const prefixData = await prefixSchema.findOne({
    GuildID: message.guild.id,
  }).catch(err => console.log(err))

  if (prefixData) {
    var guildprefix = prefixData.Prefix
  } else if (!prefixData) {
    guildprefix = botprefix
  }

  if (command) {

    const embed = new MessageEmbed()

    .setColor(color)
    .setTitle(`Command: ${command.config.name}`)
    .setDescription(`${command.config.description}`)
    .addFields(
    { name: 'Aliases', value: `${command.config.aliases.join('\`, \`') ? command.config.aliases : "None"}`, inline: true },
    { name: 'Parameters', value: `${command.config.parameters ? command.config.parameters : "None"}`, inline: true },
    { name: 'Permissions', value: `${command.config.permissions ? command.config.permissions : "None"}`, inline: true },
    { name: 'Usage', value: `\`\`\`Syntax: ${guildprefix}${command.config.syntax}\nExample: ${guildprefix}${command.config.example}\`\`\``, inline: false },
    )
    
    message.channel.send({ embeds: [embed] })
  } else if (args.length > 0) {
     
    return message.channel.send(`This command does not exist, use \`${guildprefix}help\` for the list of commands`)
  } else {
    const row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setLabel("invite")
          .setURL("https://discord.gg/")
        )

  const embed = new MessageEmbed()
  .setColor(color)
  .setTitle(`Raunt`)
  .setDescription(`>>> **[Raunt invite](https://discord.com/oauth2/authorize?client_id=1018045244450799646&permissions=8&scope=bot) <:verifiedbotdev:1027086580134969395>\nCommand count:** \`\`139\`\`\n**Global prefix:** \`\`>\`\`\n\n **Any questions or concerns? \`\`.gg/snatch\`\`\nor contact** \`\`turf#0001\`\`\n**[Support server](https://discord.gg/snatch)** <:wire:1028155579304255518>`)
  .setThumbnail(`${client.user.displayAvatarURL({size: 256, dynamic: true})}`)

  
  const embed1 = new MessageEmbed()

  .setColor(color)
  .setTitle(`protection`)
    .setDescription(`\`\`\`fix
antinuke, antinuke channelenable, antinuke channeldisable, antinuke whitelist, antinuke unwhitelist, antinuke whitelisted, antinuke enable, antinuke disable, antinuke settings, autorole, autorole enable, autorole disable, messagelog enable, messagelog disable, modlog enable, modlog disable, prefix, prefix enable, prefix disable
\`\`\``, 'Asuka#1290')

  const embed2 = new MessageEmbed()

  .setColor(color)
  .setTitle(`fun/util`)
   .setDescription(`\`\`\`fix
8ball, affect, beautiful, blur, circle, coinflip, facepalm, gay, gayrate, invert, iq, penis, rate, rip, simprate, trash, treeshrate, triggered, avatar, botinfo, guildbanner, guildicon, help, invite, membercount, ping, serverinfo, support, uptime, userbanner, userinfo, version\`\`\``, 'Asuka#1290')

  const embed3 = new MessageEmbed()

  .setColor(color)
  .setTitle(`mod/misc`)
    .setDescription(`\`\`\`fix
ban, kick, lock, mute, role, role add, role create, add emoji, role remove, purge, unban, unlock, nuke, nick, setvert, message, unmute, bancount, calculator, color, commandcount, copyembed, credits, firstmessage, knownpoll, quickpoll, servercount, seticon, spotify, urban\`\`\``, 'Asuka#1290')


  const embeds = [
    embed,
    embed1,
    embed2,
    embed3,
  ];
  
  pagination({
    embeds: embeds,
    channel: message.channel,
    author: message.author,
    time: 60000,
    button: [
             {
        name: 'first',
        emoji: '952154314166657064',
        style: 'SECONDARY',
      },
      {
        name: 'del',
        emoji: '952154318751035442',
        style: 'SECONDARY',
      },
      {
        name: 'next',
        emoji: '952154315450097685',
        style: 'SECONDARY',
      },
      {
        name: 'previous',
        emoji: '952154314166657064',
        style: 'SECONDARY',
      },
      {
        name: 'last',
        emoji: '952154315450097685',
        style: 'SECONDARY',
      },
    ]
  })
  }
}

module.exports.config = {
  name: "help",
  aliases: [],
  description: 'shows help embed',
  parameters: '',
  permissions: '',
  syntax: 'help',
  example: 'help'
}