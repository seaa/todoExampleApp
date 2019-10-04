import { store as mockStore } from './mockStore.js';

// in the service we define a base method to request or post data via fetch
// and then we can create custom functions for each use case that we need

const server = 'http://localhost:8000/';
const API = process.env.REACT_APP_API;

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

async function httpRequest ({method, service, headers, payload}) {
  const route = server + service;

  const config = {
    method,
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`,
      ...headers
    }
  };

  if (payload) {
    config.body = JSON.stringify(payload);
  }

  if (API === 'mockstore') {
    // use the mockStore as API
    // we promisify the returned value to simulate a real response
    // mockstore wont return errors, we could decide to reject here to simulate an API error
    return new Promise((resolve, reject) => {
      resolve (mockStore.exec({...config, service}));
    })
  } else {
    // use actual API
    return fetch(route, config)
    .then(handleErrors)
    .then(res => res.json());
  }
};

async function login (data) {
  return httpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    service: 'token-auth/',
    payload: data
  });
};

async function signup (data) {
  return httpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    service: 'core/users/',
    payload: data
  });
};

export {
  httpRequest,
  login,
  signup
};
