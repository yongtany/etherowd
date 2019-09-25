import React from 'react';

const LoginForm = props => {
  return (
    <div>
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">닉네임을 입력하세요.</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="닉네임 입력" />
        </div>
      </form>
      <button className="Login-button Login-mm" onClick={props.handleClick}>
        {props.loading ? 'Loading...' : 'Login with MetaMask'}
        <img
          src={require('images/metamask-icon.png')}
          class="mm-icon"
          alt="metamask"
        />
      </button>
    </div>
  )
}

export default LoginForm;
