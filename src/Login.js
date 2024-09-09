import React from 'react';

function Login(props) {
  return (
    <div display={props.token ? 'none' : ''}>
      <button onClick={props.handleLogin}>Login</button>
    </div>
  );
}

export default Login;