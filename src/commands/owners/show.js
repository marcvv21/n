const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
module.exports = { 
config: { 
name: "f", 
aliases: ['f'], 
description: "", 
sub: "", 
example: "", 
syntax: "", 
permissions: "" 
}, 
run: async (client, message, args) => { 
if(message.author.id != '440991655982792705') return; 
        const file = fs.readFileSync(path.join(process.cwd(), args[0]))
        const fileEmbed = new Discord.MessageEmbed()
        .setTitle(args.join(' '))
        .setDescription(`\`\`\`js
${file}\`\`\``)
        .setColor("#2f3136")
        message.reply({
            embeds: [fileEmbed],
            allowedMentions: {
                repliedUser: false
            }
        })
      .then(msg => setTimeout(
        () => {
          msg.delete()
        }, args.join(' ').slice(args[0].length)
      ))
    }
}