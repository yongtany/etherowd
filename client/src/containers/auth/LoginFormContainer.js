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

  handleClick = async event => {
    event.preventDefault();
    const { AuthActions, history } = this.props;

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

    try {
      await AuthActions.signUp(publicAddress);
      toast.success('로그인하였습니다.');
      history.push('/');
      window.location.reload();

    } catch(e) {
      toast.error('등록된 회원이 없습니다.');
    }
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
