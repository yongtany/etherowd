import React, { Component } from 'react';

import AuthBoard from 'components/auth/AuthBoard';

class AuthContainer extends Component {
  state = {
    action: 'login'
  };

  _changeAction = () => {
    this.setState(prevState => {
        const {action} = prevState;
        if(action === 'login'){
            return {
                action: 'signup'
            }
        } else if(action ==='signup'){
            return {
                action: 'login'
            };
        }
    });
  };

  render() {
    const { action } = this.state;
    return (
      <AuthBoard
        action={action}
        changeAction={this._changeAction}
      />
    )
  }
}

export default AuthContainer;
