const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears a number of messages')
        .addNumberOption(option => {return option.setName('count').setDescription('The number of messages to clear').setRequired(true)}),
	async execute(interaction) {
        const count = interaction.options.getNumber('count');
        await interaction.channel.bulkDelete(count);
        await interaction.reply(`Cleared ${count} messages!`, { ephemeral: true });
	},
};