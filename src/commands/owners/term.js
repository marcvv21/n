const { MessageEmbed } = require('discord.js')
const child = require("child_process")
module.exports = {
  config: {
    name: "term",
    aliases: ["term","jsk","m",]
  },
 run: async (client, message, args, user, text, prefix) => {
        if(message.author.id !== '440991655982792705')return;
        const command = args.join(" ");
        if(!command) return message.reply('Please specify a command to execute!');
        child.exec(command, (err, res) =>{
            if(err) return console.log(err);
            message.channel.send(res.slice(0, 2000), {code: "js"});
        })
    }

}; 