import React from 'react';
import styles from './ProjectNew.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProjectNew = props => (
      <div className={cx('new-wrapper')}>
        <div className={cx('project-new')}>
          <div className={cx('header text-center')}>
            <h1><strong>Create</strong></h1>
            <div className={cx('header-underline')}></div>
            <p className={cx('text-muted')}>프로젝트를 개설하세요.</p>
          </div>
          <div className={cx('new-content')}>
            <form onSubmit={props.onSubmit} error={props.errorMessage}>
              <div className="form-group">
                <label>목표금액을 설정하세요.</label>
                <input
                  className="form-control"
                  value={props.minimumContribution}
                  onChange={props.onChange}
                  name="minimumContribution"
                  placeholder="Ether"
                />
                <small id="Help" className="form-text text-muted">목표금액에 도달해야 프로젝트를 진행하실수 있습니다.</small>
              </div>
              {
                props.loading ?
                  <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                : <button className="btn btn-primary">Create!</button>
              }
            </form>
          </div>
        </div>
      </div>
);

export default ProjectNew;
