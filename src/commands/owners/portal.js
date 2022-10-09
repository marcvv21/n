const { MessageEmbed } = require('discord.js')
  const color = "#23272a"
    

  
module.exports.run = async (bot, message, args) => {    
    
    const developers = ['440991655982792705']
    if (!developers.includes(message.author.id)) {      message.reply('> dev only cmd')      
      return    }
    if (developers.includes(message.author.id)) {      let guild = null;
      if (!args[0]) return message.channel.send({        embeds: [          
        new MessageEmbed()            .setDescription(` Provide a guild name or id`)            .setColor("#808080"),        ],      });
      if (args[0]) {        
        let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));        
        let found = bot.guilds.cache.get(args[0]);        if (!found) {          
          if (fetched) {            guild = fetched;          }        } 
        else {          guild = found        }      } else {        
        return message.channel.send({          embeds: [            new MessageEmbed()              .setDescription(`Invalid guild name or id`)              .setColor("#808080"),          ],        });      }      if (guild) {        let tChannel = guild.channels.cache.find(ch => ch.type == "GUILD_TEXT");        if (!tChannel) {          return message.channel.send({            embeds: [              new MessageEmbed()                .setDescription(`Something went wrong`)                .setColor("#808080"),            ],          });        }        let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {          return message.channel.send({            embeds: [              new MessageEmbed()                .setDescription(`I dont have perms there`)                .setColor("#808080"),            ],          });        });        message.channel.send({          embeds: [            new MessageEmbed()              .setDescription(` ${guild.name} server invite - [**here**](${invite.url})`)              .setColor("#808080"),          ],        });      } else {        return message.channel.send({          embeds: [            new MessageEmbed()              .setDescription(` Im not in that server`)              .setColor("#808088"),          ],        });      }    } else {      return;    }  }
module.exports.config = {      
    name: "getinvite",    
    aliases: ['getinv', 'gi', 'portal'],    
    category: "owner",    
    description: "Generates an invitation to the server in question.",    
    usage: "[ID | name]",
}