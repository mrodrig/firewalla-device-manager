'use strict';

const axios = require('axios'),
    converter = require('json-2-csv'),
    fs = require('fs'),

    firewallaId = '@@CHANGE_ME@@',
    authorizationHeader = '@@CHANGE_ME@@',
    devicesFile = 'devices.csv',
    input = fs.readFileSync(devicesFile, 'utf8');

if (!firewallaId || firewallaId === '@@CHANGE_ME@@') {
  throw new Error('You must provide a firewallaId value. This is the `x-firewalla-id` header value from the web console.');
} else if (!authorizationHeader || authorizationHeader === '@@CHANGE_ME') {
  throw new Error('You must provide an authorizationHeader value. This is the `Authorization` header value from the web console.');
}

converter.csv2jsonAsync(input, )
  .then((devices) => {
    return Promise.all(
      devices.map((device) => {
        return updateFirewalla(device);
      })
    );
  })
  .then(() => {
    console.log('Done!');
  })
  .catch((error) => {
    console.error('An error occurred while converting devices list to JSON.', error);
  });

function updateFirewalla(device) {
  if (!device.mac) {
    return Promise.reject(`Device ${device.name} does not have a MAC address value.`);
  }

  var config = {
    method: 'post',
    url: `https://my.firewalla.com/v1/device/${device.mac}`,
    headers: {
      'accept': 'application/json',
      'x-firewalla-id': firewallaId,
      'authorization': authorizationHeader,
      'content-type': 'application/json; charset=utf-8'
    },
    data : device
  };

  return axios(config)
    .catch(function (error) {
      return Promise.reject(`An error occurred setting the values for ${device.name} - ${error}`);
    });
}
