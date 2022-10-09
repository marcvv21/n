const { MessageEmbed } = require('discord.js');
module.exports = { 
config: { 
name: "src", 
aliases: ['src'], 
description: "shows  note handler", 
sub: "sr", 
example: "jus src ig", 
syntax: "", 
permissions: "" 
}, 
run: async (client, message, args) => { 
const code = `module.exports = { \nconfig: { \nname: "", \naliases: [''], \ndescription: "", \nsub: "", \nexample: "", \nsyntax: "", \npermissions: "" \n}, \nrun: async (client, message, args) => { \n//code \n} \n}`;
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setDescription(`\`\`\`js\n${code}\`\`\``)
          .setColor("#808080")
      ],
    });
  }
}