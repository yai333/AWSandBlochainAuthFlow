import React, { useState, useEffect } from 'react';
import { AwsContext } from '../context/AwsProvider';

function Dashboard() {
  const { awsClient } = React.useContext(AwsContext);
  const [state, setState] = useState({ data: '' });

  useEffect(() => {
    const fetchHelloAPI = async () => {
      if (awsClient) {
        const request = await awsClient.sign(
          `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_HELLO_PATH}?name=YA`,
          {
            method: 'GET',
          }
        );

        const response = await fetch(request);
        setState(await response.json());
      }
    };
    fetchHelloAPI();
  }, [awsClient]);

  return (
    <div className='home'>
      <div className='content'>
        <h1>{state.data}</h1>
      </div>
    </div>
  );
}

export default Dashboard;
