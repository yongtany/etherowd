import React, { Component } from 'react';
import SignupForm from 'components/auth/SignupForm';

import web3 from 'ethereum/web3';

class SignupFormContainer extends Component {
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
    const { onLoggedIn } = this.props;

    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
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
        users.length ? users[0] : this.handleSignup(publicAddress)
      )
      // Popup MetaMask confirmation modal to sign message
      // .then(this.handleSignMessage)
      // // Send signature to backend on the /auth route
      // .then(this.handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch(err => {
        window.alert(err);
        this.setState({ loading: false });
      });
  };

  handleSignMessage = async ({
    publicAddress,
    nonce
  }) => {
    try {
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        '' // MetaMask will ignore the password argument here
      );

      return { publicAddress, signature };
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.');
    }
  };

  handleSignup = publicAddress => {
    return fetch(`/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
  };

  render() {
    const { loading } = this.state;
    return (
      <SignupForm
        loading={loading}
        handleClick={this.handleClick}
      />
    );
  }
}

export default SignupFormContainer;
