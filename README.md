# Integrating Amazon Cognito with Ethereum Blockchain

Demo project for article [Integrating Amazon Cognito with Ethereum Blockchain](https://yia333.medium.com/integrating-amazon-cognito-with-ethereum-blockchain-7e87f1425422)

![Demo](https://github.com/yai333/AWSandBlochainAuthFlow/blob/master/demo.gif?raw=true)

## Getting started
There are 2 directories in this project: frontend and server.

### Server backend
Backend is a serverless application. To deploy serverless API Gateway endpoints, run
```
sls deploy --profile xxx
```

### Frontend
Frontend is react app, to start react app, run
```
npm install
npm start
```

### How to test
Once AWS Api gateway endpoints are deployed, copy the api urls to .env in `/frontend`.