import React from 'react';
import LoginFormContainer from 'containers/auth/LoginFormContainer';
import SignupFormContainer from 'containers/auth/SignupFormContainer';

const AuthBoard = props => (
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {props.action ==='login' ? (
                <h5 className="modal-title" id="exampleModalLongTitle">
                Log In
                </h5>
              ) : (
                <h5 className="modal-title" id="exampleModalLongTitle">
                Sign Up
                </h5>
              )}
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {props.action ==='login' && <LoginFormContainer />}
              {props.action ==='signup' && <SignupFormContainer />}
            </div>
            <div className="modal-footer">
              {props.action ==='login' ? (
                <p className="footer-text" onClick={props.changeAction}>첫 방문 이십니까?</p>
              ) : (
                <p className="footer-text" onClick={props.changeAction}>이미 가입된 회원 이십니까?</p>
              )}
            </div>
          </div>
        </div>
      </div>
);

export default AuthBoard;
