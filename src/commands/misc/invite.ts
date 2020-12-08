import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class Invite extends Command{
    public constructor() {
        super("invite", {
            aliases: ["invite", "inveit", "inviet"],//HaHa TyPoS
            editable: false,
            typing: true,
            category: "misc",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Invite the bot ❤️"
            }
        })
    }

    public async exec(message: Message) {

        /**
         * Embed Declarations
         */
        let this_is_the_best_thing_u_did_in_ur_life = new MessageEmbed()
        .setAuthor("Invite Me ❤️")
        .setDescription(`You can Invite me [here](https://discord.com/api/oauth2/authorize?client_id=783911523248504833&permissions=8&scope=bot "Admin Invite")`)
        .setFooter(`That's the Admin Invite and you might want to choose what perms you want and then remove admin!`)
        
        return message.util?.send(this_is_the_best_thing_u_did_in_ur_life)
    }
}