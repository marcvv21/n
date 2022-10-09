const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')

module.exports = {
  config: {
  name: "leave",
  aliases: [""],
  description: "blacklist a user",
  sub: "", 
  example: "leave", 
  syntax: "leave", 
  permissions: "owner only" 
  },
  run: async (client, message, args) => {
    const developers = ['440991655982792705']

    if (!developers.includes(message.author.id)) {
      message.reply({embeds: [new MessageEmbed()
.setDescription(`${warning} only **Zaaak#1337** can this cmd`)
.setColor(yellow)] })
      return
    }

    client.guilds.fetch(args[0]).then(guild => message.guild.leave()
      .catch(message.reply({embeds: [new MessageEmbed()
.setDescription(`${warning} an error has occured`)
.setColor(yellow)] }))
      .then(message.reply({embeds: [new MessageEmbed()
.setDescription(`${approve} Successfully left **${guild.name}**`)
.setColor(green)] })))
  }
};