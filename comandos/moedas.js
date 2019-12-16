const Discord = require('discord.js')
const db = require('../banco/Schema.js')



exports.run = async(bot, message, args) => {

  db.Users.findOne({_id: message.author.id}, (err, user) =>{

if (err) throw err;

if (user) {
message.channel.send(`Você possui: ${user.coins.toLocaleString()} moedas`)
} else {
  user = new db.Users({_id: message.author.id});
  user.save();
  bot.emit('message', message)
}
});
  

}
