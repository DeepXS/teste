exports.run = async (client, message, args) => {
    message.channel.send(`Ping! ${parseInt(client.ping)}`)
}
