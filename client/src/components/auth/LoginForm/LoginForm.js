import React from 'react';

const LoginForm = props => {
  return (
    <div>
      <button className="Login-button Login-mm" onClick={props.handleClick}>
        {props.loading ? 'Loading...' : 'Login with MetaMask'}
        <img
          src={require('images/metamask-icon.png')}
          className="mm-icon"
          alt="metamask"
        />
      </button>
    </div>
  )
}

export default LoginForm;
