import React, { Component } from 'react';
import { connect } from 'react-redux';

import App from 'components/App';

class AppContainer extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <App isLoggedIn={isLoggedIn} />
    )
  }
}

export default connect(
  (state) => ({
    isLoggedIn: state.auth.get('isLoggedIn'),
  })
)(AppContainer);
