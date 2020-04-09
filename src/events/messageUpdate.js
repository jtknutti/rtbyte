const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'messageUpdate'	});
	}

	async run(old, msg) {
		if (this.client.ready && !old.partial && old.content !== msg.content) this.client.monitors.run(msg);

		if (!msg.guild) return;

		if (msg.guild.settings.get('channels.log') && msg.guild.settings.get('logs.events.messageUpdate') && old.content !== msg.content) await this.serverLog(old, msg);

		return;
	}

	async serverLog(old, msg) {
		const embed = new MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setColor(this.client.settings.get('colors.blue'))
			.setDescription(`${msg.channel}\n[${msg.language.get('CLICK_TO_VIEW')}](${msg.url})`)
			.addField(msg.language.get('GUILD_LOG_BEFORE'), `${old.content}`)
			.addField(msg.language.get('GUILD_LOG_AFTER'), `${msg.content}`)
			.setTimestamp()
			.setFooter(msg.language.get('GUILD_LOG_MESSAGEUPDATE'));

		const logChannel = await this.client.channels.get(msg.guild.settings.get('channels.log'));
		await logChannel.send('', { disableEveryone: true, embed: embed });
		return;
	}

};
