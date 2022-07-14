const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');
const shortid = require('shortid');
module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
        if (!interaction.isButton()) return;
        const verifyModal = new Modal()
        .setCustomId(shortid.generate())
        .setTitle('Weryfikacja')

        const opiszSiebie = new TextInputComponent()
        .setCustomId('opiszSiebie')
        .setLabel('1. Opisz krótko siebie')
        .setStyle('PARAGRAPH')
        .setMaxLength(750)

        const firstActionRow = new MessageActionRow().addComponents(opiszSiebie);
        
        const twojeDoswiadczenie = new TextInputComponent()
        .setCustomId('twojeDoswiadczenie')
        .setLabel('2. Opisz Twoje doświadczenie z fandomem furry')
        .setStyle('PARAGRAPH')
        .setMaxLength(750)
        const secondActionRow = new MessageActionRow().addComponents(twojeDoswiadczenie);
    
        const czyTolerujesz = new TextInputComponent()
        .setCustomId('czyTolerujesz')
        .setLabel('3. Czy tolerujesz LGBT?')
        .setStyle('SHORT')
        const thirdActionRow = new MessageActionRow().addComponents(czyTolerujesz);
        
        const skadZapro = new TextInputComponent()
        .setCustomId('skadZapro')
        .setLabel('4. Skąd uzyskałeś zaproszenie na serwer?')
        .setStyle('PARAGRAPH')
        .setMaxLength(350)
        const fourthActionRow = new MessageActionRow().addComponents(skadZapro);
        verifyModal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);


    await interaction.showModal(verifyModal);
	},
};