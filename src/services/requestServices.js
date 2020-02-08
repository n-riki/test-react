import jsCash from 'js-cache';
const axios = require('axios');

const CancelToken = axios.CancelToken;
let cancel;

const URL = query  => `https://api.github.com/search/repositories?${query}`;
const CASHED_TIME = 60000;


const getTableData = (query) => {
  const cached = jsCash.get(query);
  const promise = new Promise((resolve, reject) => {
    if (!!cached) {
      return resolve(cached);
    }

    axios.get(URL(query), {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    }).then((res) => {
      jsCash.set(query, res, CASHED_TIME);
      return resolve(res);
    }).catch((err) => {
      return reject(err);
    })
  })

  return promise

}

export { getTableData, cancel };

