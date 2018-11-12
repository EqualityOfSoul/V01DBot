const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require('enmap');

exports.run = (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id != config.ownerID) {
   		message.reply("You need the MANAGE_GUILD permission to change options...");
   		return;
  	};
	if (args[0] == undefined){
		message.reply("Please specify what command to enable or disable \nUsage:`v!options <command> [enable/disable]`")
	}
	if (['cmds','help','options','eval','ping','reload','stop','uptime','template'].includes(args[0])) {
		message.reply("Sorry, but you cannot disable this commands")
		return;
	};
	let opList = client.op.get(message.guild.id);
	fs.readdir("./commands/", (err, files) => {
 		if (err) return console.error(err);
 		files.forEach(file => {
	 		let fileName = file.split(".")[0];
	 		if (args[0] == fileName){
				if (['enabled','enable','1'].includes(args[1])) {
					opList[fileName] = 1;
					message.reply(`The ${fileName} feature is now enabled.`)
					client.op.set(message.guild.id, opList)
					console.log(`Enabled ${fileName} at ${message.guild.name}:${message.guild.id}`);
				} else if (['disabled','disable','0'].includes(args[1])) {
					opList[fileName] = 0;
					message.reply(`The ${fileName} feature is now disabled.`)
					client.op.set(message.guild.id, opList)
					console.log(`Disabled ${fileName} at ${message.guild.name}:${message.guild.id}`);
				} else {
					message.reply(`${fileName} feature is ${(opList[fileName] == 1) ? 'enabled':'disabled'}`)
				}
			};
 		});
	});
}

exports.help = {
	name: "Options",
	category: "System",
	description: "Disable and enable commands on your server! Requires the Manage Server permission.",
	usage: "\`options <command> [enable/disable] \`"
}
