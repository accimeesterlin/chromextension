/*eslint-disable */
const log = console.log;

export function saveToken(token) {
  if (token) {
    window.localStorage.setItem('token', token);
    log("Generated Token: ", token);
    return;
  }

  log("No Token generated!!!");
};

export function loadToken() {
  const token = window.localStorage.getItem('token');

  if (token) {
    return token;
  }

  return generateToken();
}


export function generateToken(interactive = false) {
  if (chrome && chrome.identity) {
    const options = {
      interactive
    };
    chrome.identity.getAuthToken(options, saveToken);
  }
};
