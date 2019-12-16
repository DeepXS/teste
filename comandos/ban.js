exports.run = async (client, message, args) => {
    const Discord = require('discord.js')
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`:x: **${message.author.username}** Você não possui permissão para isto!`)
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`:x: ${message.author.username} Eu não possuo permissão para isto!`)
    
    if (!args[0])  return message.channel.send(`:x: **${message.author.username}** Você está utilizando isto incorretamente!\n⚙️ Use: **${config.prefix}ban** \`<user>\``)
    
    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if (!target) return message.reply(`:x: **${message.author.username}** Este usuário não existe!`)
              if(!target.bannable) return message.channel.send(`:x: **${message.author.username}** O cargo do usuário é maior que o meu!`)
    
            let razao = args.slice(1).join(' ')
              if(!razao) razao = " "
    
                if(razao < 1) return message.channel.send(` :x: **${message.author.username}** Insira uma razão!`)
    
                    let embban = new Discord.RichEmbed()
                    .setAuthor(`Punição aplicada!`, `${target.user.avatarURL}`)
                    .setDescription(`\n\nNome: ${target.user.username} (ID: ${target.user.id})\nAutor: **${message.author.username} (ID: ${message.author.id})** \nRazão: **${razao}**`)
                    await target.ban(razao)
                    message.channel.send(embban)
}

