import React from 'react';
import styles from './ProjectDetail.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const ProjectDetail = props => (
      <div className={cx('new-wrapper')}>
        <div className={cx('project-detail')}>
          <div className="project-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h2 className="display-4">Investment</h2>
            <p className="lead">여러분의 투자를 기다립니다.</p>
          </div>
          <div className="container">
            <div className="card-deck mb-3 text-center">
              <div className="card mb-4 box-shadow">
                <div className="card-header">
                  <h5 className="my-0 font-weight-normal">현 투자액 / 목표금액</h5>
                </div>
                <div className="card-body">
                  <h3 className="card-title pricing-card-title">${props.balance} / <span className="text-muted">${props.minimumContribution}</span></h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>프로젝트 승인을 받으려면 목표금액 이상의 투자를 받아야 합니다.</li>
                  </ul>
                </div>
              </div>

              <div className="card mb-4 box-shadow">
                <div className="card-header">
                  <h5 className="my-0 font-weight-normal">개설자</h5>
                </div>
                <div className="card-body">
                  <h6 className="card-title pricing-card-title">{props.manager}</h6>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>개설자가 이 프로젝트를 만들었으며 돈을 인출하려는 요청을 만들 수 있습니다.</li>
                  </ul>
                </div>
              </div>

              <div className="card mb-4 box-shadow">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">인출 요청</h4>
                </div>
                <div className="card-body">
                  <h2 className="card-title pricing-card-title">{props.requestsCount}</h2>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>모금액에서 돈을 인출하려고 합니다. 요청은 투자자들에 한해서 승인받아야합니다.</li>
                  </ul>
                </div>
              </div>

              <div className="card mb-4 box-shadow">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">(현)투자자 수</h4>
                </div>
                <div className="card-body">
                  <h2 className="card-title pricing-card-title">{props.approversCount} 명</h2>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>프로젝트 진행에 관여할 수 있는 투자자</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
);

export default ProjectDetail;
