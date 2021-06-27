import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { AwsProvider } from './context/AwsProvider';

import Main from './Main';

function App() {
  return (
    <AuthProvider>
      <AwsProvider>
        <Main />
      </AwsProvider>
    </AuthProvider>
  );
}

export default App;
