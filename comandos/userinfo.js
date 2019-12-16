const Discord = require('discord.js')
const config = require('../config.json')
const db = require('../banco/Schema.js')


module.exports.run = async(bot, message, args) => {
  const moment = require('moment')
  moment.locale('pt-br')
  
    let User
    if (!args[0]) User = message.member;
    let mention = message.mentions.members.first()
    if (mention) User = mention
if (!User) {
    try {
        console.log('Entrei no block try')
        User = message.guild.members.get(args[0]) 
        if (!User) return message.channel.send('Usuario não encontrado') 
    }
    catch(err) {
        console.log('Entrei no bloco catch')
        return 
    }
}

    const contaCriada = moment(User.user.createdTimestamp).format('lll') // Formato DD do MMM do AAAA às hh:mm
    const diasContaCriada = moment.duration(message.createdTimestamp - User.user.createdTimestamp).asDays() // Dias de criaçao da conta
    const entrouNoServer = moment(User.joinedTimestamp).format('lll') // Data de entrada no server
    const diasEntrouNoServer = moment.duration(message.createdTimestamp - User.joinedTimestamp).asDays() // Dias de entrada no server

    const embedUI = new Discord.RichEmbed()
    .setTitle(`Informações de ${User.user.username}`)  
    .setColor('BLUE')
    .setThumbnail(User.user.displayAvatarURL)
    .setTimestamp(new Date(moment.locale('pt-br')))
    .setFooter(message.author.tag, message.author.displayAvatarURL)  
    .addField("Discord Tag:", `\`\`\`md\n${User.user.tag}\`\`\``, true)
    .addField("Apelido:", `\`\`\`md\n${User.nickname || "Nenhum"}\`\`\``, true)
    .addField("ID:", `\`\`\`md\n${User.id}\`\`\``, true)
    .addField("Entrou no Discord em:", `\`\`\`md\n${contaCriada} (${Math.floor(diasContaCriada)} Dias)\`\`\``, true)
    .addField("Entrou no Server em:", `\`\`\`md\n${entrouNoServer} (${Math.floor(diasEntrouNoServer)} Dias)\`\`\``, true)
    .setDescription(`Cargos:\`\`\`md\n${User.roles.map(r => r.name).join(' | ')}\`\`\``, true)




    message.channel.send(embedUI)
}