const { Guild } = require("discord.js");
const config = require('../../config.json')

module.exports = class db {
    /**
     * The Guild to get database values for
     * @param {Guild}
     */
    constructor(Guild) {

    }

    get prefix() {
        return config.bot.prefix
    }
    /*get(key, fallback) {
       return this.client.db.get(`${this.id}_${key}`) || fallback;
    }

    set(key, data) {
        return this.client.db.set(`${this.id}_${key}`, data);
    }

    delete(key) {
        return this.client.db.delete(`${this.id}_${key}`);
    }*/
}