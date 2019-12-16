// Made by: Ony#0006 ( Festival Central client )
const {  Client, Collection } = require('discord.js')
const client = new Client({
    fetchAllMembers: true
})
const config = require('./config.json')
const db = require('./banco/Schema.js')
client.aliases = new Collection()
client.commands = new Collection()


// Mostrar os status do client.
client.on('ready', async () => {
   
    console.log(`client iniciado com sucesso!`);
    let status = [
        { name: 'client oficial do Festival Central. (Criado por: Ony#0006)', type: 'PLAYING' },
        { name: 'Use fc!ajuda, p/ ver meus comandos.', type: 'WATCHING' }
    ];

    //STREAMING = Transmitindo
    //LISTENING = Ouvindo
    //PLAYING = Jogando
    //WATCHING = Assistindo

    function setStatus() {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ game: randomStatus });
    }

    setStatus();
    setInterval(() => setStatus(), 10000);  //10000 = 10Ms = 10 segundos
})


client.on('message', async (message) => {
    // if's
    if (message.author.bot) return; // Não adicionara client para a DataBase.
    const user = await db.Users.findOne({ _id: message.author.id }) || await db.Users.create({ _id: message.author.id });

    if (message.content.includes("https://discord.gg/", "https://discord.me", "discord.gg/")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete();
            message.reply("❌ **Você não pode divulgar aqui!**");
        }
    }

    if (message.channel.id === 'id do canal que o comando não deve funcionar') return;
    if (["id dos usuarios que tem permição para enviar links"].includes(message.author.id)) return;
    const bannedWords = [`www.`, `https://`, `https:`, `https`, `http://`, `http:`, `www .`, `https:/`]
    try {
        if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
            if (message.author.id === message.guild.ownerID) return;
            await message.delete();
            await message.channel.send(`**❌Você não pode enviar links aqui!**`);
        }
    } catch (e) {
        console.log(e);
    }


    // Sistema de funcionamento do BANCO DE DADOS
    db.Users.findOne({ "_id": message.author.id }, function (erro, documento) { // Procura na database o documento do usuário, pela id dele
        if (documento) { // Caso Encontre o documento, executará esse código:
            documento.coins += 1 // Dinheiro do usuário, será adicionado +1
            documento.xp += 10 // XP +10
            if (documento.xp > documento.level * 350) { // Caso o documento.xp teja chegado no limite dele, q é level*350
                documento.xp = 0 // o Xp vai pro 0
                documento.level += 1 // e o level sobe +1
            }
            documento.save(); // No fim de tudo, o documento será salvado
        } else { // Caso o Usuário não tenha ainda um documento salvo na Database
            new db.Users({
                _id: message.author.id,
            }).save();
        }
    })     
    
    
    if (!message.content.startsWith(config.prefix)) return;
    if (message.channel.type == "dm") return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {

        if (err.code == "MODULE_NOT_FOUND") return;
        console.error(err);

    }
});

client.login(config.token)