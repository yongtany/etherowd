import React, { Component } from 'react';
import LoginForm from 'components/auth/LoginForm';
import web3 from 'ethereum/web3';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import * as authActions from 'store/modules/auth';

class LoginFormContainer extends Component {
  state = {
    loading: false,
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

    const formData = new FormData();
    formData.append('publicAddress', publicAddress);

    const object = {
      'publicAddress': formData.get('publicAddress')
    };

    try {
      await AuthActions.signIn(object);

      window.location.reload();
      history.push('/');
      toast.success('로그인하였습니다.');

    } catch(e) {
      toast.error('등록된 회원이 없습니다.');
    }
    this.setState({ loading: false });
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
  null,
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(LoginFormContainer));
