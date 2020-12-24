const { Structures } = require('discord.js')
const db = require('../Database/UserDatabase')

module.exports = Structures.extend("User", User => {
    class UserExt extends User {
        constructor(...args) {
            super(...args);
            if(!this.bot) {
            this.db = new db(this);
            } else {
                this.db = undefined
            }
        }
    }

    return UserExt
})