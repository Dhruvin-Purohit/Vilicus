/**
 * Capitalize a string
 * @param {string} str
 */
function Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * To Ordinal Number
 * @param {int} number
 */
function toOrdinal(int: number | string) {
    int = int.toString()
    if (int === '11' || int === '12' || int === '13') return int + 'th';
    if (int.endsWith('1')) return int + 'st';
    else if (int.endsWith('2')) return int + 'nd';
    else if (int.endsWith('3')) return int + 'rd';
    else return int + 'th';
}

/**
 * Choice is random from array (gave the name choice bc i am used to the python way)
 * @param {string[]} array
 */
function choice(array: string[]) {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * Random will give a random number (default is 1 to 100)(same case i am used to the python way)
 * @param {number} min
 * @param {number} max
 */
function random(min: number, max: number) {
    if (!min || !max) {
        min = 0
        max = 100
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Removes Duplicate entries from array
 * @param {string[]} array
 */
function cleanArray(array: string[]) {
    return Array.from(new Set(array).values())
}

/**
 * Simple time conversion
 * @param {number} time
 */
function cleanTime(time: number) {
    const tt = [
        { n: 'd', s: 86400000 },
        { n: 'h', s: 3600000 },
        { n: 'm', s: 60000 },
        { n: 's', s: 1000 }
    ]
    const ctime = [ Math.floor(time / tt[0].s).toString() + tt[0].n ]
    for(let i = 0; i < 3; i++) {
        ctime.push(Math.floor(time % tt[i].s / tt[i + 1].s).toString() + tt[i + 1].n)
    }
    return ctime.filter(g => !g.startsWith('0')).join(', ');
}

const fn = {
    Capitalize,
    toOrdinal,
    choice,
    random,
    cleanArray,
    cleanTime
}

export default fn