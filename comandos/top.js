module.exports = {
  run: (client, message, args) => {
    
    const Discord = require('discord.js')
    const db  = require('../banco/Schema.js')
    db.Users.find().sort({ coins: -1 }).exec(async (e, u) => {
                                  
      const embed = new Discord.RichEmbed()
      .setTitle('LeaderBoard')
      for(let i = 0; i < 10; i++) {
        let member = client.users.get(u[i]._id)
        embed.setColor('#6722e6')
       embed.addField(i+1 +' `' + member.tag + '`', `Level: ${u[i].rank} - XP: ${u[i].xp} - Coins: ${u[i].coins}`) 
      }
          message.channel.send(embed)
                                                          })
  
  }, 
  
}

