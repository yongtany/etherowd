import React from 'react';
import styles from './RequestNew.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import LoadingButton from 'components/common/LoadingButton';

const cx = classNames.bind(styles);

const RequestNew = props => (
  <div className={cx('new-wrapper')}>
        <div className={cx('project-detail')}>
          <div className={cx('header text-center')}>
            <h1><strong>Request</strong></h1>
            <div className={cx('header-underline')}></div>
            <p className={cx('text-muted')}>투자자들에게 필요사항을 요청하세요.</p>
          </div>
          <div className="container">
            <Link to={`/project/${props.id}/requests`} className="left">
              <button className="btn btn-back">
                뒤로 가기
              </button>
            </Link>
          </div>
          <div className="container p-5">
            <form onSubmit={props.onSubmit} className="main-form">
              <div className="row">
                  <div className="col pl-5">
                      <div className="form-group">
                        <label>이체금</label>
                        <input
                          type="text"
                          name="value"
                          value={props.value}
                          onChange={props.onChange}
                          className="form-control"
                          placeholder="필요한 금액을 입력하세요."
                        />
                      </div>
                  </div>
                  <div className="col pr-5">
                      <div className="form-group">
                        <label>배송 계좌</label>
                        <input
                          type="text"
                          name="recipient"
                          value={props.recipient}
                          onChange={props.onChange}
                          className="form-control"
                          placeholder="이체금을 배송할 계좌를 입력해주세요."
                        />
                        <small className="form-text text-muted">
                            투자자들의 승인을 거치면 배송계좌로 자동 송금됩니다.
                        </small>
                      </div>
                  </div>
              </div>
              <div className="form-group pr-4 pl-4">
                  <label>부연설명</label>
                  <input
                    type="text"
                    name="description"
                    value={props.description}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="이체금이 필요한 이유를 적어주세요."
                  />
                  <div className="invalid-feedback">Please enter a valid username.</div>
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" id="accept-terms" className="form-check-input" />
                <label className="form-check-label">Accept Terms &amp; Conditions</label>
              </div>
              {
                props.loading ?
                <LoadingButton
                  type={"danger"}
                />
                : <button className="btn btn-danger">요청하기</button>
              }
            </form>
          </div>
        </div>
      </div>
)

export default RequestNew;
