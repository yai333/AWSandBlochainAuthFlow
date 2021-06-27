import React from 'react';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  Address: null,
  SessionToken: null,
  AccessKeyId: null,
  SecretKey: null,
  Expiration: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('address', JSON.stringify(action.payload.address));
      localStorage.setItem(
        'sessionToken',
        JSON.stringify(action.payload.sessionToken)
      );
      localStorage.setItem(
        'accessKeyId',
        JSON.stringify(action.payload.accessKeyId)
      );
      localStorage.setItem(
        'secretKey',
        JSON.stringify(action.payload.secretKey)
      );
      localStorage.setItem(
        'expiration',
        JSON.stringify(action.payload.expiration)
      );
      return {
        ...state,
        isAuthenticated: true,
        address: action.payload.address,
        sessionToken: action.payload.sessionToken,
        accessKeyId: action.payload.accessKeyId,
        SecretKey: action.payload.secretKey,
        expiration: action.payload.expiration,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        address: null,
        sessionToken: null,
        accessKeyId: null,
        secretKey: null,
        expiration: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        authState: state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
