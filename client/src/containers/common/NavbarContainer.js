import React, { Component } from 'react';
import Navbar from 'components/common/Navbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import * as authActions from 'store/modules/auth';

class NavbarContainer extends Component {
  handleSignOut = () => {
    const { AuthActions, history } = this.props;
    toast.success('성공적으로 로그아웃 하셨습니다.');
    AuthActions.signOut();
    history.push('/');
  }

  render() {
    const { isLoggedIn, profile_image, username } = this.props;
    return (
      <Navbar
       isLoggedIn={isLoggedIn}
       signOut={this.handleSignOut}
       profile_image={profile_image}
       username={username}
      />
    );
  }
}

export default connect(
  (state) => ({
    isLoggedIn: state.auth.get('isLoggedIn'),
    username: state.auth.get('username'),
    profile_image: state.auth.get('profile_image'),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(NavbarContainer));
