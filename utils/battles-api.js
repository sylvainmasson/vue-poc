import axios from 'axios';
import { getAccessToken } from './auth';

const BASE_URL = 'http://localhost:3333';

export {getPublicStartupBattles, getPrivateStartupBattles};

function getPublicStartupBattles() {
  const url = BASE_URL + '/api/battles/public';
  console.log(url);
  return axios.get(url).then(function (response) {
    return response.data;
  })
}

function getPrivateStartupBattles() {
  const url = BASE_URL + '/api/battles/private';
  return axios.get(url, { headers: { Authorization: 'Bearer ' +  getAccessToken() }}).then(function (response) {
    return response.data;
  })
}
