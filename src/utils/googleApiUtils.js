import axios from 'axios';
import { loadToken } from './authUtils';

let retry = false;

export async function fetchGoogleApi(path, cb) {
  const url = `https://www.googleapis.com/gmail/v1/users/me${path}`;
  const token = loadToken();

  return axios({
    url,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => cb(response, null))
  .catch(error => {
    let statusCode = 500;
    if (error.response) {
      statusCode = error.response.status;
    }
    console.log('Status Code: ', statusCode);

    if (statusCode === 401 && !retry) {
      retry = true;
      window.localStorage.removeItem('token');
      loadToken();
      console.log('New Token generated!!!');
      fetchGoogleApi(path, cb);
    }

    cb(null, error);
  });
};

export async function sendEmailToGoogle(payload) {
  const url = `https://www.googleapis.com/gmail/v1/users/me/messages/send`;
  const token = loadToken();

  axios({
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: payload
  })
  .catch((error) => {
    const statusCode = error.data.statusCode;

    if (statusCode === 401 && !retry) {
      retry = true;
      fetchGoogleApi();
    }
  });
};