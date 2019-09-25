import React from 'react';
import LoginFormContainer from 'containers/auth/LoginFormContainer';
import SignupFormContainer from 'containers/auth/SignupFormContainer';

const AuthBoard = props => {
  return (
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Log In</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {props.action ==='login' && <LoginFormContainer />}
              {props.action ==='signup' && <SignupFormContainer />}
            </div>
            <div class="modal-footer">
              <p class="footer-text" onCliack={props.changeAction}>첫 방문 이십니까?</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AuthBoard;
