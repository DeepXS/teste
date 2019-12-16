exports.run =  async (client, message, args) => {
        const Discord = require('discord.js')
        const config = require("../config.json")

        if(!args[0]) {
            //let categorias = [... new Set(client.commands.map(c => c.config.category))] //Remove categorias repetidadas na hora de listar(n estou usando so pra lembrar como faz msm '-')
            let embed = new Discord.RichEmbed()
                  .setColor(config.color)
                  .setTimestamp()
                  .setThumbnail(client.displayAvatarURL)
                  .addField("Informação rápida:", `Para saber mais sobre um comando: \`${prefix}help <comando>\``)
                  .addField(`:wrench: Utilidades (${client.commands.filter(c => c.config.category == 'utils').size} comando(s)):`, `\`${client.commands.filter(c => c.config.category == 'utils').map(c => c.config.name).join('` | `')}\``)
                 // .addField(`:cop: Moderacao (${client.commands.filter(c => c.config.category == 'mods').size} comando(s)):`, `\`${client.commands.filter(c => c.config.category == 'mods').map(c => c.config.name).join('` | `')}\``)
                  .addField(`:crown: Desenvolvedores (${client.commands.filter(c => c.config.category == 'dev').size} comandos(s)):`, `\`${client.commands.filter(c => c.config.category == 'dev').map(c => c.config.name).join('` | `')}\``)
            .addField(`:moneybag:  Economia (${client.commands.filter(c => c.config.category == 'economia').size} comando(s)):`, `\`${client.commands.filter(c => c.config.category == 'economia').map(c => c.config.name).join('` | `')}\``)
//            .addField(`:notes:  Música (${client.commands.filter(c => c.config.category == 'musica').size} comando(s)):`, `\`${client.commands.filter(c => c.config.category == 'musica').map(c => c.config.name).join('` | `')}\``)
                  .setFooter(`Comando requisitado por: ${message.author.tag}`, `${message.author.avatarURL}`);
            message.channel.send(embed)
        }
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command)
            let embed = new Discord.RichEmbed()
                .setColor(config.color)
                .setTimestamp()
                .addField(':page_with_curl: **`Descricao:`**', command.config.desc)
                .addField(':wave: **`Use:`**', `${config.prefix}${command.config.usage}`)
                .addField(':link: **`Aliases:`**', `${command.config.noalias || config.prefix + command.config.aliases.join(` | ${config.prefix}`)}`)
                .setFooter(`Comando requisitado por: ${message.author.tag}`, `${message.author.displayAvatarURL}`);
            message.channel.send(embed)
        } else if (!client.commands.has(command) && args[0]) {
            message.channel.send(`ERROR! **${message.author.username}**, Não achei nenhum comando com esse nome!`)
        }

    }

