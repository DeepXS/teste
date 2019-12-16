const Discord = require('discord.js');
module.exports.run = (bot, message, args) => {
  let usuario = args[0] ? message.mentions.users.first() ? message.mentions.users.first() : bot.users.get(args.join(' ')) ? bot.users.get(args.join(' ')) : bot.users.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) ? bot.users.find(user => user.username.toLowerCase() === args.join(' ').toLowerCase()) : bot.users.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) ? bot.users.find(user => user.tag.toLowerCase() === args.join(' ').toLowerCase()) : message.guild.members.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()) ? message.guild.members.find(user => user.displayName.toLowerCase() === args.join(' ').toLowerCase()).user : message.guild.members.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())) ? message.guild.members.find(user => user.displayName.toLowerCase().includes(args.join(' ').toLowerCase())).user : bot.users.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) ? bot.users.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) : message.author : message.author
  let av = usuario.displayAvatarURL;
  if (av.endsWith('.gif')) {
    av = `${usuario.displayAvatarURL}?size=2048`
  }
  var embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`🖼 | Foto de perfil de **${usuario.username}**`)
    .setDescription(`🔗 | **[Link para a imagem](${usuario.avatarURL})**`)
    .setImage(av)
    .setTimestamp()
    message.channel.send(embed)
}

