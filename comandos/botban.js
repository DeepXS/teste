exports.run = async(client, message, args) => {
    const db = require('../banco/Schema.js')

    let razaou = args.slice(0).join(' ')

    db.Users.findOne({
      '_id': message.author.id
    }, function (erro, usuario) {
          if (!razaou.length < 1) {
            let banir = message.mentions.users.first() ? message.mentions.users.first() : client.users.get(args[0])
            if (banir) {
              if (banir.id === message.author.id) {
                message.reply('**:x: Você não pode se banir de usar o bot.**')
              } else {
                db.Users.findOne({
                  '_id': banir.id
                }, function (arro, alvo) {
                  if (alvo) {
                    if (alvo.dev || alvo.admin) {
                      message.reply(`:x: **Este usuário é um Adm ou Dev do bot.**`)
                    } else {
                      if (alvo.ban) {
                        alvo.ban = false
                        alvo.coins = 0
                        alvo.rank = 0
                        alvo.xp = 0
                        alvo.save()
                        message.channel.send(`**${banir.username} foi desbanido com sucesso. <:check:438534229563801620>**`)
                      } else {
                        alvo.ban = true
                        alvo.coins = 0
                        alvo.rank = 0
                        alvo.xp = 0
                        alvo.save()
                        message.channel.send(`**${banir.username} foi banido com sucesso. **`)
                      }
                    }
                  } else {
                    message.channel.send(':x: **Ocorreu um erro ao executar este comando.**')
                  }
                })
              }
            } else {
              message.reply('**Usuário não encontrado.**')
            }
          } else {
            message.channel.send('**:x: Mencione o usuário ou diga seu ID.**')
          }
        })
    }
