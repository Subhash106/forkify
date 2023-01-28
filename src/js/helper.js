import { TIMEOUT_SECONDS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { data } = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};

export const sendJSON = async function (url, data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  try {
    const fetchPromise = fetch(url, options);

    const response = await Promise.race([
      fetchPromise,
      timeout(TIMEOUT_SECONDS)
    ]);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { data } = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};
