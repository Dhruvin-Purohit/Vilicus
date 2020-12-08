import 'discord-akairo'
import { Listener } from 'discord-akairo'

export default class Ready extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }

    public exec(): void {
        console.log(`${this.client.user?.tag} is ready now...`)
        this.client.user?.setActivity({
            name: "Clash of Clans",
            type: 'COMPETING'
        })
    }
}