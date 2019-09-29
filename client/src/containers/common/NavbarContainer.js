import React, { Component } from 'react';
import Navbar from 'components/common/Navbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authActions from 'store/modules/auth';

class NavbarContainer extends Component {
  handleSignOut = () => {
    const { AuthActions } = this.props;
    AuthActions.signOut();
  }

  render() {
    const { isLoggedIn, profile_image, username} = this.props;

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
    profile_image: state.auth.get('profile_image'),
    username: state.auth.get('username')
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(NavbarContainer));
