const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "NzAzNzYwMjA5MzE0NzA5NTc1.XqTSYA.lzfPEbqeqfq7rMtGUfYIBxCx8dQ";
const PREFIX = "!";

const Minehut = require("minehut.js")
Minehut.getServers().then(console.log)



 
const fs = require('fs');
bot.commands = new Discord.Collection();
 
fs.readdir('./commands/', (err, files) => {
    if(err) console.error(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles <= 0) { return console.log('No command files detected!')}
    else { console.log(jsfiles.length + ' commands detected!') }

    jsfiles.forEach((f, i) =>{
        var cmds = require(`./commands/${f}`);
        console.log(`Command ${f} loading..`);
        bot.commands.set(cmds.config.command, cmds);
    })
})

 
bot.on('ready', () => {
	console.log("The bot is active and ready to go!");
});
 
bot.on('message', async message => {
    var sender = message.author;
    var msg = message.content.toUpperCase();
    var cont = message.content.slice(PREFIX.length).split(" ");
    var args = cont.slice(1);
    
    if (!message.content.startsWith(PREFIX)) return;

    var cmd = bot.commands.get(cont[0]);
    if (cmd) cmd.run(bot, message, args);

});
 





bot.login(token);
