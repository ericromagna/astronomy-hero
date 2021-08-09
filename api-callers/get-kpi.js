const axios = require('axios');
const serveCommons = require('../commons/server-config.json');

module.exports = function CallKpiApi () {
    return new Promise((resolve, reject) => {
        axios.get(serveCommons.prod.getKpi)
        .then(res => { resolve(res.data) })
        .catch(err => {
            console.error(`CallKpiApi error: ${err}`);
            reject(false);
        });
    });
}