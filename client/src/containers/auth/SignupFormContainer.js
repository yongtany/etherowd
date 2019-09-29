import React, { Component } from 'react';
import SignupForm from 'components/auth/SignupForm';

import web3 from 'ethereum/web3';
import { toast } from "react-toastify";
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';

class SignupFormContainer extends Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;
    const { username, profile_image } = this.props;
    return (
      <SignupForm
        loading={loading}
        username={username}
        profile_image={profile_image}
        handleSubmit={this._handleSubmit}
        onChangeInput={this.handleChangeInput}
        onChangeFileInput={this.handleChangeFileInput}
      />
    );
  }

  _handleSubmit = async event => {
    event.preventDefault();
    const { username, profile_image, AuthActions, history } = this.props;
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
    formData.append('username', username);
    formData.append('profile_image', profile_image);

    try {
      if (
        username !== ""
      ) {
        await AuthActions.signUp(formData);
        history.push('/');
        window.location.reload();
        toast.success('회원가입에 성공하였습니다.');
        this.setState({ loading: false });
      }
      else {
        toast.error('필드를 채워주세요.');
      }
    } catch(e) {
      console.log(e);
    }
  };

  handleChangeInput = ({name, value}) => {
    const { AuthActions } = this.props;
    AuthActions.changeInput({name, value});
  }

  handleChangeFileInput = ({ files}) => {
    const { AuthActions } = this.props;
    AuthActions.changeFileInput({files});
  }
}

export default connect(
  (state) => ({
    profile_image: state.auth.get('profile_image'),
    username: state.auth.get('username')
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(SignupFormContainer));
