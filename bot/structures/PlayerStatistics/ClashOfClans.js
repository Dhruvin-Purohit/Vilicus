const fetch = require('node-fetch')
const config = require('../../config.json')

module.exports = class CocStats {
    constructor(Tag) {
        const res = fetch(`https://cocproxy.royaleapi.dev/v1/players/%23${Tag}`, {
            headers: {
                'Authorization': `Bearer ${config.api.coc}`
            }
        }).then(res => res.json).catch(err => console.log(err))

        this.statistics = res
    }

    get stats() {
            return this.statistics
    }
}
//made this specifically to get this lmfao
