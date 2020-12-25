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
            }) || new UserModel({
                id: User.id
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