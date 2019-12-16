const Discord = require('discord.js')
const db = require('../banco/Schema.js')
require('moment-duration-format')
const moment = require('moment')
moment.locale('pt-br')

exports.run = async(bot, message, args) => {

  
      db.Users.findOne({
    '_id': message.author.id
  }, function (erro, doc) {
    if (doc) {
      let valor = Math.floor(Math.random() * 1000) + 7999;
      var tempo = moment.duration.format([moment.duration((parseInt(doc.timedaily) + 86400000) - Date.now())], 'hh:mm:ss')

      if ((parseInt(doc.timedaily) + 86400000) <= (Date.now())) {
        doc.coins += valor
        doc.timedaily = Date.now()
        doc.save()
        message.channel.send(`Você coletou: ${valor.toLocaleString()} moedas`)
      } else {
        message.channel.send(`Espere ${tempo} para pegar novamente as moedas.`)
      }
    } else {
      message.channel.send('Ocorreu um erro, tente novamente novamente uasr o comando.')
    }
  })
      

}
