module.exports = {
    config: {
        name: "nuke",
        aliases: [],
        category: "moderation",
        description: "Nuking channel",
        usage: "",
        accessableby: "Administrator"
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return message.channel.send("You Don't Have Permission!")
        }

        message.channel.send('**nuking...**')
        
        await message.channel.clone().then

        ((ch) =>{ch.setParent(message.channel.parentid);

        ch.setPosition(message.channel.position);

        message.channel.delete().then

        (ch.send('**Channel Has Been Nuked**'))
 
    });
    }
}