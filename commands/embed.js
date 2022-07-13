const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Creates a new embed')
        .addStringOption(option => {return option.setName('title').setDescription('The title of the embed')})
        .addStringOption(option => {return option.setName('description').setDescription('The description of the embed')})
        .addStringOption(option => {return option.setName('color').setDescription('The color of the embed')})
        .addStringOption(option => {return option.setName('footer').setDescription('The footer of the embed')})
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const embed = new MessageEmbed();
        try {
        if (interaction.options.getString('title')) embed.setTitle(interaction.options.getString('title'));
        if (interaction.options.getString('description')) embed.setDescription(interaction.options.getString('description'));
        if (interaction.options.getString('color')) embed.setColor(interaction.options.getString('color'));
        if (interaction.options.getString('footer')) embed.setFooter(interaction.options.getString('footer'));
        await interaction.channel.send({ embeds: [embed] });
        } catch (error) {
            const embed = new MessageEmbed();
            embed.setTitle('Error');
            embed.setDescription(error.message);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};