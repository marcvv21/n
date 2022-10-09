const { MessageEmbed }  = require("discord.js")

module.exports = async (client, message) => {

  const logchannel = client.channels.cache.get("")

  const embed = new MessageEmbed()

  .setColor('#36393F')
  .setTitle('Guild Leave Logs')
  .setDescription(`Left server **${message.name}** with **${message.memberCount}** members | Guild ID: **${message.id}**`)
  .setTimestamp()

  let channel = client.guilds.get('your-guild-id').channels.get('1000522454529232917');
channel.send("1026287087315603517");
}