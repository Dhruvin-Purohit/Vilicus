const { Collection } = require('discord.js');
const djs = require('discord.js')

/**
 * Capitalize a string
 * @param {string} str
 */
function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * To Ordinal Number
 * @param {int} number
 */
function toOrdinal(int) {
    int = int.toString();
    if (int === '11' || int === '12' || int === '13')
        return int + 'th';
    if (int.endsWith('1'))
        return int + 'st';
    else if (int.endsWith('2'))
        return int + 'nd';
    else if (int.endsWith('3'))
        return int + 'rd';
    else
        return int + 'th';
}

/**
 * Choice is random from array (gave the name choice bc i am used to the python way)
 * @param {string[]} array
 */
function choice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Random will give a random number (default is 1 to 100)(same case i am used to the python way)
 * @param {number} min
 * @param {number} max
 */
function random(min, max) {
    if (!min || !max) {
        min = 0;
        max = 100;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Removes Duplicate entries from array
 * @param {string[]} array
 */
function cleanArray(array) {
    return Array.from(new Set(array).values());
}

/**
 * Simple time conversion
 * @param {number} time
 */
function cleanTime(time) {
    const tt = [
        { n: 'd', s: 86400000 },
        { n: 'h', s: 3600000 },
        { n: 'm', s: 60000 },
        { n: 's', s: 1000 }
    ];
    const ctime = [Math.floor(time / tt[0].s).toString() + tt[0].n];
    for (let i = 0; i < 3; i++) {
        ctime.push(Math.floor(time % tt[i].s / tt[i + 1].s).toString() + tt[i + 1].n);
    }
    return ctime.filter(g => !g.startsWith('0')).join(', ');
}

/**
 * @param items
 * @param {Number} stuffperpage
 * @param {Number} page
 */
function paginate(items, page = 1, stuffperpage = 10) {
    offset = (page - 1) * stuffperpage,

    paginatedItems = items.slice(offset).slice(0, stuffperpage),
    totalPages = Math.ceil(items.length / stuffperpage);

    return {
        page: page,
        perPage: stuffperpage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
        pages: paginatedItems
    };
}

module.exports = {
    paginate,
    Capitalize,
    toOrdinal,
    choice,
    random,
    cleanArray,
    cleanTime
}