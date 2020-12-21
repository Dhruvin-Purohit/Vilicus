const { Structures } = require('discord.js');
const db = require('../Database/GuildDatabase')

module.exports = Structures.extend('Guild', Guild => {
    class GuildExt extends Guild {
        constructor(...args) {
            super(...args);
            this.db = new db(this);
        }
    }

    return GuildExt;
});