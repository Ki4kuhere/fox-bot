const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remindverify')
		.setDescription('remind verify to user')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addMentionableOption(option => {return option.setName('user').setDescription('The user to verify').setRequired(true)}),
    async execute(interaction) {
        const user = interaction.options.getMentionable('user');
        const e = new MessageEmbed()
        .setTitle(`Weryfikacja - ${interaction.guild.name}`)
        .setDescription('Przypominamy o weryfikacji na kanale <#996744238068924416>')
        .setColor('RED')
        .setTimestamp()
        .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL())
        await user.send({ embeds: [e] });
        await interaction.reply({content: 'Przypomnienie wysłane!', ephemeral: true });

    },
};