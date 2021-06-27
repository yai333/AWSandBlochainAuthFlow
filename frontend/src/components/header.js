import React from 'react';
import { AuthContext } from '../context/AuthProvider';

export const Header = () => {
  const { authState, dispatch } = React.useContext(AuthContext);
  return (
    <nav id='navigation'>
      <h1 href='#' className='logo'>
        LOGO
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: 'LOGOUT',
          })
        }
      >
        {authState.isAuthenticated && <h1>LOGOUT</h1>}
      </button>
    </nav>
  );
};

export default Header;
