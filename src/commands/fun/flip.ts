import 'discord-akairo'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import fn from '../../utils/functions'

export default class Flip extends Command{
    public constructor() {
        super("flip", {
            aliases: ["flip", "coinflip", "coin", "toss", "hot", "cf"],//no wtf not that hot this Heads or Tails
            editable: false,
            typing: true,
            category: "fun",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Flip a coin"
            },
            cooldown: 10000
        })
    }

    public exec(message: Message): Promise<Message> {
        let fuck_tuition_tests = ["Heads", "Tails"]//Rant: yes i had to write this during a stupid tuition test of which they are not even ready to take the 
                                                   //Continuation: pdf of the paper through whatsapp their crappy app doesn't even do anything simple such as opening a pdf
        return message.channel.send(`${fn.choice(fuck_tuition_tests)}`)//Todo: Add 2 emotes (one for heads and other for tails) and imply it here
    }
}