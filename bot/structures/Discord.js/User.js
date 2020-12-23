const { Structures } = require('discord.js')
const db = require('../Database/UserDatabase')

module.exports = Structures.extend("User", User => {
    class UserExt extends User {
        constructor(...args) {
            super(...args);
            this.db = new db(this);
        }
    }

    return UserExt
})