 exports.run = async (client, message, args) => {
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`:X: **${message.author.username}**, Adicione a permissão \`KICK_MEMBERS\` em meu cargo para que isto funcione corretamente!`)
    
    if (!message.guild.member(message.author.id).hasPermissions("KICK_MEMBERS")) return message.channel.send(`:X: **${message.author.username}**, Você precisa da permissão \`KICK_MEMBERS\` para que isto funcione corretamente!`)
    
    var alvo = message.mentions.users.first()
    var razão = args.slice(1).join(" ")
    
    if (message.mentions.users.size < 1) return message.channel.send(`:x: **${message.author.username}**, Você esta utilizando isso incorretamente!\n⚙️ Use: **fc!kick** \`<@user> reason\``)
    if (!message.guild.member(alvo).kickable) return message.channel.send(`:x: **${message.author.username}**, Meu cargo é inferior ao deste usuario`)
    if (razão.length < 1) return message.channel.send(`:x: **${message.author.username}**, Insira uma razão`)
    message.guild.member(alvo).kick()
    message.author.send(`✅ Usuario expulso com sucesso!`)
     message.channel.send(`✅ **Usuario:** \`${alvo.username}\` foi banido com sucesso!\n**Motivo:** \`${razão}\``)
    
}
