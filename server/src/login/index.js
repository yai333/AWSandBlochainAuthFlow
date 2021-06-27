'use strict';
const AWS = require('aws-sdk');

const {
  getIdToken,
  getNonce,
  getCredentials,
  validateSig,
  updateNonce,
} = require('../utils');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { address, signature } = requestBody;
  const { Items: nonces } = await getNonce(address);

  if (nonces && nonces.length > 0) {
    const { nonce } = AWS.DynamoDB.Converter.unmarshall(nonces[0]);
    const sigValidated = await validateSig(address, signature, nonce);
    if (sigValidated) {
      const { IdentityId: identityId, Token: token } = await getIdToken(
        address
      );

      console.log('identityId', identityId);
      console.log('token', token);

      const { Credentials: credentials } = await getCredentials(
        identityId,
        token
      );

      console.log('credentials', credentials);

      //change nonce at final step
      await updateNonce(address);

      return {
        headers,
        statusCode: 200,
        body: JSON.stringify(credentials),
      };
    }
  }
  return {
    headers,
    statusCode: 401,
    body: JSON.stringify({
      login: false,
    }),
  };
};
