'use strict';
const AWS = require('aws-sdk');
const { getNonce } = require('../utils');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
module.exports.handler = async (event, context, callback) => {
  const {
    queryStringParameters: { address },
  } = event;

  try {
    const { Items: nonces } = await getNonce(address);
    if (nonces && nonces.length > 0) {
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify(AWS.DynamoDB.Converter.unmarshall(nonces[0])),
      };
    }
    return {
      headers,
      statusCode: 404,
      body: JSON.stringify({
        nonce: null,
      }),
    };
  } catch (error) {
    return callback(err, null);
  }
};
