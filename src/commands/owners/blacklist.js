const db = require("quick.db");
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
  name: "blacklist",
  aliases: ["bl"],
  description: "blacklist a user",
  sub: "", 
  example: "blacklist", 
  syntax: "blacklist", 
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

    try {
      
      const name = args[0];
        if(!name) message.reply({embeds: [new MessageEmbed()
.setDescription(`${warning} please provide vaild name`)
.setColor(yellow)] })
    const user = await client.users.fetch(args[0])
    if(!user) message.reply({embeds: [new MessageEmbed()
.setDescription(`${warning} Invalid user or id`)
.setColor(yellow)] })
       fetched = db.get(`blacklist_${user.id}`)
      if(!fetched) {
      db.set(`blacklist_${user.id}`, true)
      message.reply({embeds: [new MessageEmbed()
.setDescription(`${approve} blacklisted **${user.tag}**`)
.setColor(green)] })
    }else{ 
      return message.reply({embeds: [new MessageEmbed()
.setDescription(`${warning} This user is already blacklisted!`)
.setColor(yellow)] })
    } 

    } catch (err){
      return message.reply({embeds: [new MessageEmbed()
.setDescription(`${warning} pls give a vaild id`)
.setColor(yellow)] })
    }
  
  }
};