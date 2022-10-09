const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
config: {
name: "wow",
aliases: ["guilds"]
},
run: async (client, message, args) => {
 if (message.author.id !== '440991655982792705') return  message.channel.send({
          embeds: [
            new MessageEmbed()
              .setDescription(` try one more time `)
              .setColor("YELLOW")
            ],
        });
        const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(20);
                  
        const description = guilds
            .map((guild, index) => {
                return `${index + 1}. ${guild.name} | **Members**: ${guild.memberCount} | **ID**: ${guild.id}`
            })
            .join("\n");
            
            const embed = new Discord.MessageEmbed()
                .setTitle('Top Guilds')
                .setDescription(description)
                .setColor("#2f3136")
            message.channel.send({ embeds: [embed]})
              
    }                                           
};