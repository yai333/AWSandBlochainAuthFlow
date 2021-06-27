'use strict';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
module.exports.handler = async (event) => {
  const {
    queryStringParameters: { name },
  } = event;

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({
      data: `hello ${name}, you are awesome! your IAM role is authorized.`,
    }),
  };
};
