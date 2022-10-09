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
  name: "setavatar",
  aliases: [""],
  description: "set avatar bot wolfin",
  sub: "", 
  example: "setavatar", 
  syntax: "setavatar", 
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

    if (developers.includes(message.author.id)) {
      if(message.attachments.size > 0) { 
    message.attachments.forEach(attachment => {
        client.user.setAvatar(attachment.url)
        .then(u => message.channel.send(` Bot Avatar Changed`))
        .catch(e => { return message.channel.send(`an error has occured`); });
    });
    } else if (args.length) {
        let str_content = args.join(" ")
        client.user.setAvatar(str_content)
        .then(u => message.reply({embeds: [new MessageEmbed()
.setDescription(`${approve} avatar has been set`)
.setColor(green)] }))
        .catch(e => { return message.channel.send(`an error has occured`); });
    } else {
        message.channel.send(`please provide an pfp link`);
     }
    }
  }
};