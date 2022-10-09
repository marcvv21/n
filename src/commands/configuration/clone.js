const { MessageEmbed, Formatters } = require("discord.js")
const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')

module.exports = {
  config: {
  name: "clone",
  description: "Clone a server",
  aliases: [""],
  },
  
  run: async (client, message, args) => {
    const developers = ['440991655982792705']

    if (!developers.includes(message.author.id)) {
      message.reply({embeds: [new MessageEmbed()
.setDescription(`${warning} only **Zaaak#1337** can this cmd`)
.setColor(yellow)] })
      return
    }
    
    const guild = message.guild;
    try {
      (await guild.createTemplate(guild.name)).sync().then((t) => {
        const createTemplate = new MessageEmbed()
          .setTitle("SERVER TEMPLATE")
          .addField("URL", Formatters.codeBlock("fix", `${t.url}`))
          .addField("Code", Formatters.codeBlock("fix", `${t.code}`))
          .setColor("#2f3136")
        return message.reply({ embeds: [createTemplate] })
      })
    } catch (error) {
      const templateCreated = new MessageEmbed()
        .setTitle(`SERVER TEMPLATE`)
        .addField("URL", Formatters.codeBlock("fix", `${(await guild.fetchTemplates()).map(v => v.url)}`))
        .addField("Code", Formatters.codeBlock("fix", `${(await guild.fetchTemplates()).map(v => v.code)}`))
        .setColor(color)
      return message.reply({ embeds: [templateCreated] })
    }
  },
};