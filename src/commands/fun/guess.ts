import 'discord-akairo'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import fn from '../../utils/functions'

export default class Guess extends Command{
    public constructor() {
        super("guess", {
            aliases: ["guess"],
            editable: false,
            typing: true,
            category: "fun",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Number guessing game",
                usage: "number"
            },
            args: [
                {
                    id: "num",
                    type: "number",
                    default: 69
                }
            ],
            cooldown: 10000
        })
    }

    public async exec(message: Message, { num }: { num: number }) {

        num = Math.ceil(num)

        /**
         * Checks
         */
        if (num < 15) return message.channel.send(`😞 You aren't a baby anymore go higher`)

        if (num > 69) return message.channel.send(`😒 Can you not keep that below 70?`)

        /**
         * Constant Declarations
         */
        let me = fn.random( 1, num)

        let msg = 'asdf this will change anyways'
        
        if (msg) {
            if (num === 69) msg = fn.choice(["are my **leader**", "shall **rule the world**", "are **suffering from success**", "are the greatest of great people i have met by far"])
            else if (num > 50) msg = fn.choice(["are a true **Legend**", "are a Man of virtue", "are the definition of *intelligence*", "will become **Champion**"])
            else msg = fn.choice(["did play well", "did it", "played well"])
        }

        let fail = fn.choice(["Failed Successfully", "didn't make it", "Can't win", "are a loser", "never win", "are dumb"])

        const won_or_lost = new Promise(async resolve => { 
            await message.channel.send(`Alright I have choosen my number between \`1\` and \`${num}\`\nStart Guessing`)
            await message.channel.awaitMessages(m => m.author.id == message.author.id && m.content, {
                max: 1
            })
            .then(collection => collection.first()?.cleanContent === me.toString() ? resolve(true) : resolve(false))
            .catch(() => resolve(false))
        })

        if (await won_or_lost) {
            return message.channel.send(`You ${msg} ${message.author}, I had chosen \`${me}\`, Good Game`)
        } else {
            return message.channel.send(`You ${fail} ${message.author}, The number was \`${me}\`, Definetely didn't expect this from you`)
        }
    }
}