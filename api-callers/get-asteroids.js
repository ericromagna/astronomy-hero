const axios = require('axios');
const serveCommons = require('../commons/server-config.json');

module.exports = function CallAsteroidApi () {
    return new Promise((resolve, reject) => {
        axios.get(serveCommons.prod.getAsteroids)
        .then(res => { resolve(res.data) })
        .catch(err => {
            console.error(`CallKpiApi error: ${err}`);
            reject(false);
        });
    });
}