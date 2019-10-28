/*eslint-disable */
export function saveToken(token) {
  if (token) {
    window.localStorage.setItem('token', token);
    return;
  }

};

export function loadToken(isNewToken) {
  const token = window.localStorage.getItem('token') || '';

  if (!token && isNewToken) {
    return generateToken();
  }

  return token;
}


export function generateToken(interactive = false) {
  if (chrome && chrome.identity) {
    const options = {
      interactive
    };
    chrome.identity.getAuthToken(options, saveToken);
  }
};
