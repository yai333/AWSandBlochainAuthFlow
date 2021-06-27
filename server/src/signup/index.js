'use strict';
const AWS = require('aws-sdk');

const { updateNonce } = require('../utils');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { address } = requestBody;

  const response = await updateNonce(address);

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
