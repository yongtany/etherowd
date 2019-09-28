import React, { Component } from 'react';
import LoginForm from 'components/auth/LoginForm';

import web3 from 'ethereum/web3';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

class LoginFormContainer extends Component {
  state = {
    loading: false
  }

  handleAuthenticate = ({
    publicAddress,
    signature
  }) =>
    fetch(`/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());

  handleClick = async () => {
    const { isLoggedIn } = this.props;

    // Check if MetaMask is installed
    if (!window.ethereum) {
      toast.error('메타마스크를 먼저 설치하세요.');
      return;
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      toast.error('메타마스크를 먼저 활성화 하세요.');
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    this.setState({ loading: true });

    // Look if user with current publicAddress is already present on backend
    fetch(
      `/users?publicAddress=${publicAddress}`
    ).then(response => response.json())
      // If yes, retrieve it. If no, create it.
      .then(users =>
        users.length ? users[0] : toast.error('등록된 회원이 없습니다.')
      )
      // Popup MetaMask confirmation modal to sign message
      // .then(this.handleSignMessage)
      // // Send signature to backend on the /auth route
      // .then(this.handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(isLoggedIn)
      .then(this.setState({ loading: false }))
      .catch(err => {
        window.alert(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;
    return (
      <LoginForm
        loading={loading}
        handleClick={this.handleClick}
      />
    );
  }
}

export default connect(
  (state) => ({
    isLoggedIn: state.auth.get('isLoggedIn'),
    token: state.auth.get('token'),
  }),
)(withRouter(LoginFormContainer));
