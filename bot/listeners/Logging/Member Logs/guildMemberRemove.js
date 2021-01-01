const { Listener } = require('discord-akairo')
const dmd = require('discord-md-tags')

module.exports = class extends Listener {
    constructor() {
        super('guildmemberremove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        })
    }

    async exec(member) {
        let cguild = member.guild
        let del = true
        console.log(del)
        for (let guild of this.client.guilds.cache.filter(g => g != cguild).array()) {
            if(guild.members.cache.get(member.user.id)) {
                del = false
                break
            }
        }
        console.log(del)
        if(del) await member.user.db.udb.drop()
    }
}