import axios from 'axios';
import {
  loadToken
} from './authUtils';

export async function fetchGoogleApi(path) {
  const url = `https://www.googleapis.com/gmail/v1/users/me${path}`;
  const token = loadToken();

  return axios({
    url,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};