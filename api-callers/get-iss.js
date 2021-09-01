const axios = require("axios");
const serveCommons = require("../commons/server-config.json");

export function GetIss() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${serveCommons.prod.getIss}=${Math.floor(Date.now() / 1000)}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(`CallIssApi error: ${err}`);
        reject(false);
      });
  });
}

export function GetLocation(latitute, longitude) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${serveCommons.prod.getLocation}/${latitute},${longitude}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(`CallIssApi error: ${err}`);
        reject(false);
      });
  });
}
