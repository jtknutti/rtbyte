const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['removecmd', 'delcmd', 'deletecommand', 'removecommand'],
			permissionLevel: 6,
			description: language => language.get('COMMAND_DELETECMD_DESCRIPTION'),
			usage: '<name:string>',
			usageDelim: ' '
		});
	}

	async run(msg, [name]) {
		name = name.toLowerCase();
		// eslint-disable-next-line id-length
		const cmd = msg.guild.settings.commands.customCommands.find(c => c.name.toLowerCase() === name);
		if (!cmd) return msg.reject();
		await msg.guild.settings.update('commands.customCommands', cmd, { action: 'remove' });
		return msg.affirm();
	}

};