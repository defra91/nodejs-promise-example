'use strict';

const request = require('request');
const API_BASE_URL = 'https://api.github.com';

const getUser = (username) => {
  let options = {
    url: `${API_BASE_URL}/users/${username}`,
    headers: {
      'User-Agent': 'request'
    }
  };

  return new Promise((resolve, reject) => {
    // Do async job here
    console.log('Performing request...');
    request.get(options, (err, resp, body) => {
      console.log('Got response!');
      if (err) {
          reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

const getMultipleUsers = (users) => {
  var promises = users.map((user) => {
    return getUser(user);
  });
  return Promise.all(promises);
};

const handleError = (err) => {
  console.log(`An error occurred ${err}`);
};

getMultipleUsers(['defra91', 'ngrx', 'angular']).then((result) => {
  let users = result.map((user) => {
    return { login: user.login, url: user.url, id: user.id };
  });
  console.log(users);
}).catch(handleError);
