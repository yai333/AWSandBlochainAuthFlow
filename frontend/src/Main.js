import React, { useContext } from 'react';
import { AwsClient } from 'aws4fetch';

import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Header from './components/header';
import { AuthContext } from './context/AuthProvider';
import { AwsContext } from './context/AwsProvider';

function Main() {
  const { authState, dispatch } = useContext(AuthContext);
  const { awsClient, setAwsClient } = useContext(AwsContext);

  React.useEffect(() => {
    const address = JSON.parse(localStorage.getItem('address') || null);
    const sessionToken = JSON.parse(
      localStorage.getItem('sessionToken') || null
    );
    const secretKey = JSON.parse(localStorage.getItem('secretKey') || null);
    const accessKeyId = JSON.parse(localStorage.getItem('accessKeyId') || null);
    const expiration = JSON.parse(localStorage.getItem('expiration') || null);
    const today = new Date();

    if (address && sessionToken && expiration) {
      if (new Date(expiration) > today) {
        dispatch({
          type: 'LOGIN',
          payload: {
            address,
            sessionToken,
            secretKey,
            accessKeyId,
            expiration,
          },
        });
        const aws = new AwsClient({
          accessKeyId,
          secretAccessKey: secretKey,
          sessionToken,
          region: 'ap-southeast-2',
          service: 'execute-api',
        });
        setAwsClient(aws);
      } else {
        dispatch({
          type: 'LOGOUT',
        });
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div className='app-container'>
        {!authState.isAuthenticated ? <Login /> : <Dashboard />}
      </div>
    </>
  );
}

export default Main;
