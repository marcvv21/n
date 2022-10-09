const { color, green, red, yellow, approve, deny, warning } = require('../../../config.json')
const { MessageEmbed, Permissions } = require("discord.js")
const prefixSchema = require("../../database/prefix");
const whitelistSchema = require("../../database/whitelist");
const antiNukeSchema = require('../../database/antinuke')
const antilogSchema = require('../../database/antilog')
const { botprefix } = require('../../../config.json')

module.exports.run = async (client, message, args) => {

  const user = message.mentions.members.first() || message.guild.members.cache.get(args[1])

  const antilogchannel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[1])

  const antinukedata = await antiNukeSchema.findOne({
    GuildID: message.guild.id,
  });

  const antilogdata = await antilogSchema.findOne({
    GuildID: message.guild.id,
  });

  const prefixData = await prefixSchema.findOne({
    GuildID: message.guild.id,
  }).catch(err => console.log(err))

  if (prefixData) {
    var guildprefix = prefixData.Prefix
  } else if (!prefixData) {
    guildprefix = botprefix
  }

  const greencheck = '<:on:908397171466973195>'

  let antinuketoggle

  let antilogtoggle

  if (antinukedata) {
    antinuketoggle = '<:on:908397171466973195>'
  } else {
    antinuketoggle = '<:off:908397107235405825>'
  }

  if (antilogdata) {
    antilogtoggle = '<:on:908397171466973195>'
  } else {
    antilogtoggle = '<:off:908397107235405825>'
  }

  if (!args[0]) {

    if (message.author.id !== message.guild.ownerId) return message.channel.send(`Only the guild owner can use this command`)

    const embed = new MessageEmbed()

    .setColor(color)
    .setTitle('antinuke')
   .setDescription(`**Features**\n\`\`\`Anti-Ban\nAnti-Kick\nAnti-Channel Creation/Deletion\nAnti-Role Creation/Deletion\nAnti-Role Update\nAnti-User Role Update\`\`\`\n\n**Whitelist / Unwhitelist**\n\`\`\`use >antinuke whitelist to <@user/id> to whitelist & use >antinuke unwhitelist <@user/id> to unwhitelist. Only the owner of the server can access this command.\n\nRaunt comes packed with a log channel command where you can set a channel to log anytime the bot bans someone for attempting to raid/nuke. use ${guildprefix}antinuke channelenable <mention/id> to enable.\`\`\`
    `)
    .setFooter('raunt antinuke')
  
    return message.channel.send({ embeds: [embed] })
  }

  if (args[0] === 'channelenable') {

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions`)

    if(antinukedata) {

      if (!antilogchannel || antilogchannel.type !== 'GUILD_TEXT') return message.channel.send(`You forgot to provide a channel`)

      if (antilogdata) {
        await antilogSchema.findOneAndRemove({
          GuildID: message.guild.id,
      });
    
      let newData = new antilogSchema({
        Antilog: antilogchannel.id,
        GuildID: message.guild.id,
      });
      newData.save();

      message.channel.send(`**${antilogchannel.name}** is now set as antinuke logs`)

      } else if (!antilogdata) {
      
       let newData = new antilogSchema({
         Antilog: antilogchannel.id,
         GuildID: message.guild.id,
       });
       newData.save();

       message.channel.send(`**${antilogchannel.name}** is now set as antinuke logs`)

      }
    } else if (!antinukedata) {

      const embed = new MessageEmbed()
      
      .setColor(color)
      .setDescription(`Anti-Nuke toggle is currently disabled, use \`${guildprefix}antinuke enable\``)
 
      message.channel.send({ embeds: [embed] })
    }
  }

  if (args[0] === 'channeldisable') {

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send(`You're missing the \`administrator\` permissions`)

    if(antinukedata) {

    const data = await antilogSchema.findOne({
      GuildID: message.guild.id,
    });
  
    if (data) {
      await antilogSchema.findOneAndRemove({
        GuildID: message.guild.id,
    });

    message.channel.send('Antinuke logs have been disabled')
    } else if (!data) {
      message.channel.send('No antinuke logs exists')
    }

  } else if (!antinukedata) {

    const embed = new MessageEmbed()
      
      .setColor(color)
      .setDescription(`Anti-Nuke toggle is currently disabled, use \`${guildprefix}antinuke enable\``)
 
      message.channel.send({ embeds: [embed] })
   }
  }

  // WHITELIST

  if (args[0] === 'whitelist') {

    if (message.author.id !== message.guild.ownerId) return message.channel.send(`Only the guild owner can use this command`)

    if(antinukedata) {

    if (!user) return message.channel.send(`You didn't mention a user`)

    if(user) {

        whitelistSchema.findOne({ GuildID: message.guild.id, UserID: user.id }, async function(err, client) {
          if (!client) {
            const newWhiteList = new whitelistSchema({
              GuildID: message.guild.id,
              UserID: user.id
          });  
      
          newWhiteList.save().catch(err => console.log(`[ERROR] ${err}`));

          const embed = new MessageEmbed()

          .setColor(color)
          .setDescription(`<@${user.id}> is now whitelisted`)

          message.channel.send({ embeds: [embed] })

        } else {

            const embed = new MessageEmbed()

            .setColor(color)
            .setDescription(`<@${user.id}> is already whitelisted`)

            message.channel.send({ embeds: [embed] })
        }
      })
    }
    } else if (!antinukedata) {

      const embed = new MessageEmbed()
      
      .setColor(color)
      .setDescription(`Anti-Nuke toggle is currently disabled, use \`${guildprefix}antinuke enable\``)
 
      message.channel.send({ embeds: [embed] })
    }
   }

   // UNWHITELIST

   if (args[0] === 'unwhitelist') {

    if (message.author.id !== message.guild.ownerId) return message.channel.send(`Only the guild owner can use this command`)

    if(antinukedata) {

    if (!user) return message.channel.send(`You didn't mention a user`)
   
    if(user) {

        whitelistSchema.findOneAndDelete({ GuildID: message.guild.id, UserID: user.id }, async function(err, client) {
         if (!client) {
     
           const embed = new MessageEmbed()
     
           .setColor(color)
           .setDescription(`<@${user.id}> not found on the database`)
         
           message.channel.send({ embeds: [embed] })

          } else {

            const embed = new MessageEmbed()
      
            .setColor(color)
            .setDescription(`<@${user.id}> is now unwhitelisted`)
          
            message.channel.send({ embeds: [embed] })
        }
      })
    }
    } else if (!antinukedata) {

      const embed = new MessageEmbed()
      
      .setColor(color)
      .setDescription(`Anti-Nuke toggle is currently disabled, use \`${guildprefix}antinuke enable\``)
 
      message.channel.send({ embeds: [embed] })
    }
   }

   // WHITELISTED

   if (args[0] === 'whitelisted') {

    if (message.author.id !== message.guild.ownerId) return message.channel.send(`Only the guild owner can use this command`)

    if(antinukedata) {

        whitelistSchema.find({ GuildID: message.guild.id }, function(err, guildID) {
        if (err) return console.log(err);
        let user = "";

        guildID.forEach(guild => {
        user += `<@${guild.UserID}>\n`;
        });
            
        const embed = new MessageEmbed()
          
        .setColor(color)
        .setAuthor(`Whitelisted Users`)
        .setDescription(user.length ? `${user}` : "No users found")
        
        message.channel.send({ embeds: [embed] })
        })

    } else if (!antinukedata) {

      const embed = new MessageEmbed()
      
      .setColor(color)
      .setDescription(`Anti-Nuke toggle is currently disabled, use \`${guildprefix}antinuke enable\``)
 
      message.channel.send({ embeds: [embed] })
     }
   }
   
   // ENABLE

   if (args[0] === 'enable') {

    if (message.author.id !== message.guild.ownerId) return message.channel.send(`Only the guild owner can use this command`)

    if(antinukedata) {

      message.channel.send(`Anti-Nuke toggle is currently enable, use \`${guildprefix}antinuke disable\``)

    } else if (!antinukedata) {

        const embed = new MessageEmbed()

        .setColor(color)
        .setDescription(`Toggled antinuke on`)
     
        message.channel.send({ embeds: [embed] })

      let newData = new antiNukeSchema({
          GuildID: message.guild.id,
      });
      newData.save();
     }
    }

    // DISABLE

    if (args[0] === 'disable') {

     if (message.author.id !== message.guild.ownerId) return message.channel.send(`Only the guild owner can use this command`)

     if(antinukedata) {

        await antiNukeSchema.findOneAndRemove({
            GuildID: message.guild.id,
        });

        const embed = new MessageEmbed()

        .setColor(color)
        .setDescription(`Toggled antinuke off`)
     
        message.channel.send({ embeds: [embed] })

     } else if (!antinukedata) {

      const embed = new MessageEmbed()
      
      .setColor(color)
      .setDescription(`Anti-Nuke toggle is currently disabled, use \`${guildprefix}antinuke enable\``)
 
      message.channel.send({ embeds: [embed] })
      }
    }

    if (args[0] === 'settings') {

    if (message.author.id !== message.guild.ownerId) return message.channel.send(`Only the guild owner can use this command.`)

    if(antinukedata) {

      const embed = new MessageEmbed()

      .setColor(color)
      .setTitle(`${message.guild.name} Settings`)
      .addFields(
      { name: '\`Anti-Nuke\`', value: `${antinuketoggle}`, inline: true },
      { name: '\`Anti-Logs\`', value: `${antilogtoggle}`, inline: true },
      { name: '\`Anti-Ban\`', value: `${greencheck}`, inline: true },
      { name: '\`Anti-Channel Create\`', value: `${greencheck}`, inline: true },
      { name: '\`Anti-Channel Delete\`', value: `${greencheck}`, inline: true },
      { name: '\`Anti-Bot Add\`', value: `${greencheck}`, inline: true },
      { name: '\`Anti-Permission Update\`', value: `${greencheck}`, inline: true },
      { name: '\`Anti-Kick\`', value: `${greencheck}`, inline: true },
      { name: '\`Anti-Role Create\`', value: `${greencheck}`, inline: true },
      { name: '\`Anti-Role Delete\`', value: `${greencheck}`, inline: true },
      )
      .setFooter('raunt antinuke')

      message.channel.send({ embeds: [embed] })

    } else if (!antinukedata) {

      const embed = new MessageEmbed()
      
      .setColor(color)
      .setDescription(`Anti-Nuke toggle is currently disabled, use \`${guildprefix}antinuke enable\``)
 
      message.channel.send({ embeds: [embed] })
      }
    }
}
    
module.exports.config = {
  name: "antinuke",
  aliases: ['an'],
  description: 'Views how to setup anti-nuke',
  parameters: '',
  permissions: ['ADMINISTRATOR', 'OWNER'],
  syntax: 'antinuke [command]',
  example: 'antinuke whitelist'
}