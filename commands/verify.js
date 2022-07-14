const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('verify user to join the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addMentionableOption(option => {return option.setName('user').setDescription('The user to verify').setRequired(true)})
        .addStringOption(option => {return option.setName('info').setDescription('The info to send to the user').setRequired(false)}),
    async execute(interaction) {
        const user = interaction.options.getMentionable('user');
        const info = interaction.options.getString('info');
        const role = interaction.guild.roles.cache.find(role => role.id === '799638547271385148');
        await user.roles.add(role);
        const e = new MessageEmbed()
        .setTitle(`Weryfikacja - ${interaction.guild.name}`)
        .setDescription(`Zostałeś zweryfikowany przez ${interaction.user.tag} \n Masz już dostęp do wszystkich kanałów`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL())
        if(info) e.addField('Dodatkowe informacje', info);
        await user.send({ embeds: [e] });

        const e1 = new MessageEmbed()
        .setTitle(`Weryfikacja ${user.user.tag} zakończona`)
        .setDescription(`Administrator ${interaction.user.tag} zweryfikował użytkownika ${user.user.tag}`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL())
        if(info) e1.addField('Z dodatkowymi informacjami:', info);

        await interaction.guild.channels.cache.get('997070968927289434').send({ embeds: [e1] });
        await interaction.reply({content: 'Użytkownik został zweryfikowany!', ephemeral: true });
    },
};