const urban = require('relevant-urban'),
    Discord = require('discord.js');

module.exports.run = async (client, message, args, tools) => {
    if (!args[0]) return message.channel.send('***Please say a word to look up!***');

    let res = await urban(args.join(' ')).catch(e => {
        return message.channel.send('**Sorry, that word is not defined**');
    })

    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(res.word)
        .setURL(res.urbanURL)
        .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
        .addField('Author', res.author, true)

    message.channel.send(embed);

}

module.exports.config = {
    command: "urban"
}
