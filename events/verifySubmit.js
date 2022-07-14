const { MessageEmbed } = require('discord.js');
const shortid = require('shortid');
module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
        if (!interaction.isModalSubmit()) return;
     //   client.db.setServerVar('verification', interaction.user.id, interaction.guild.id, false);
        const opiszSiebie = interaction.fields.getTextInputValue('opiszSiebie');
        const twojeDoswiadczenie = interaction.fields.getTextInputValue('twojeDoswiadczenie');
        const czyTolerujesz = interaction.fields.getTextInputValue('czyTolerujesz');
        const skadZapro = interaction.fields.getTextInputValue('skadZapro');
        await interaction.reply({ content: 'Twój formularz weryfikacyjny został wysłany do weryfikatora. \n Zostaniesz powiadomiony gdy proces weryfikacji się zakończy lub gdy będą potrzebne dodatkowe informacje.', ephemeral: true });
        const embed = new MessageEmbed()
        .setTitle(`Weryfikacja konta ${interaction.user.username}`)
        .setDescription(`Osoba o nicku ${interaction.user.tag} zgłosiła formularz weryfikacyjny. \n Odpowiedzi zostaną zamiesszczone poniżej. \n Aby zweryfikować tą osobę napisz **/verify @wzmianka**`)
        .addField('1. Opisz krótko siebie', opiszSiebie || "Nie podano")
        .addField('2. Opisz Twoje doświadczenie z fandomem furry', twojeDoswiadczenie || "Nie podano")
        .addField('3. Czy tolerujesz LGBT?', czyTolerujesz || "Nie podano")
        .addField('4. Skąd uzyskałeś zaproszenie na serwer?', skadZapro || "Nie podano")
        .setColor('#0099ff')
        .setTimestamp()
        .setFooter('/verify @wzmianka', client.user.avatarURL());
        client.channels.cache.get('997070968927289434').send({embeds: [embed]});
    },
};