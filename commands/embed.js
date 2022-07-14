const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Creates a new embed')
        .addStringOption(option => {return option.setName('title').setDescription('The title of the embed')})
        .addStringOption(option => {return option.setName('description').setDescription('The description of the embed')})
        .addStringOption(option => {return option.setName('color').setDescription('The color of the embed')})
        .addStringOption(option => {return option.setName('footer').setDescription('The footer of the embed')})
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        // IF BUTTONS
        .addBooleanOption(option => {return option.setName('buttons').setDescription('Whether or not to add buttons to the embed')})
        .addStringOption(option => {return option.setName('buttonname').setDescription('The name of the button')})
        .addStringOption(option => {return option.setName('buttonid').setDescription('The ID of the button')})
        .addStringOption(option => {return option.setName('buttonstyle').setDescription('The Style of the button')
        .addChoices(
            { name: 'primary', value: 'PRIMARY' },
            { name: 'secondary', value: 'SECONDARY' },
            { name: 'success', value: 'SUCCESS' },
            { name: 'danger', value: 'DANGER' },
        )}),
    async execute(interaction) {
        const embed = new MessageEmbed();
        try {
        if (interaction.options.getString('title')) embed.setTitle(interaction.options.getString('title'));
        if (interaction.options.getString('description')) embed.setDescription(interaction.options.getString('description'));
        if (interaction.options.getString('color')) embed.setColor(interaction.options.getString('color'));
        if (interaction.options.getString('footer')) embed.setFooter(interaction.options.getString('footer'));
        
        if(interaction.options.getBoolean('buttons')) {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId(interaction.options.getString('buttonid'))
            .setLabel(interaction.options.getString('buttonname'))
            .setStyle(interaction.options.getString('buttonstyle'))
        );
        return interaction.channel.send({embeds: [embed], components: [row]});
        }

        await interaction.channel.send({ embeds: [embed] });
        } catch (error) {
            const embed = new MessageEmbed();
            embed.setTitle('Error');
            embed.setDescription(error.message);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};