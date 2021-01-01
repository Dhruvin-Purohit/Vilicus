const VilcusClient = require('./structures/Client')

const client = new VilcusClient()

let clantags = []
for (guild in client.guilds.cache) {
    if(guild.db.gdb.cocclan) clantags.push(guild.db.gdb.cocclan)
}
client.cocClient.init(clantags)

client.cocClient.on('donationEvent', (message) => {
    console.log(message)
})

client.start()
