const { User } = require("discord.js");
const config = require('../../config.json')
const UserModel = require('../Schemas/UserSchema')

module.exports = class db {
    /**
     * The User to get database values for
     * @param {User}
     */
    constructor(User) {
        (async() => {
            this.udb = await UserModel.findOne({
                id: User.id
            }, (err, g) => {
                if(err) User.client.emit("error", err)
    
                if(!g) {
                    const newG = new UserModel({
                        id: User.id
                    })
                    newG.save()
                    .then(res => console.log(res))
                    .catch(err => User.client.emit("error", err))
                }
            })
            })()

    }

    get trusted() {
        return this.udb.trusted || false
    }

    get bstag() {
        return this.udb?.bs
    }

    get coctag() {
        return this.udb?.coc
    }

    get crtag() {
        return this.udb?.cr
    }

}