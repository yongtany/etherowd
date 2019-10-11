import React from 'react';
import styles from './ProjectContent.scss';
import classnames from 'classnames/bind';
import { HeartEmpty } from 'components/common/Icons'

const cx = classnames.bind(styles);

const ProjectContent = props => {
  return (
    <div className={cx('project-content col-md-4')}>
      <div className={cx('upperBox')}>
        <p className={cx('days')}>{props.days}일째 펀딩중</p>
        <p className={cx('paragraph')}><span className={cx('focus')}>{props.balance}</span> 원 펀딩</p>
        <p className={cx('paragraph')}><span className={cx('focus')}>{props.approversCount}</span> 명의 투자자</p>
        <p className={cx('paragraph')}>최소 투자액 <span className={cx('focus')}>{props.minimumContribution}</span>원</p>
        <p className={cx('paragraph')}>투자자 요청 <span className={cx('focus')}>{props.requestsCount}</span>건</p>
      </div>
      <button className={'funding-button'}>투자하기</button>
      <div className={cx('util-buttons')}>
        <button className={cx('util-button')}><HeartEmpty /> {props.favoriteCount}</button>
        <button className={cx('util-button')}>공유하기</button>
      </div>

      <div className={cx('user-info')}>
        <p>창업자 정보</p>
        <div className={cx('info-content')}>
          <img
            className={cx('col-md-5')}
            src={props.profile_image}
            alt={props.username}
          />
          <div className={cx('col-md-7 profile')}>
            <h6>{props.username}</h6>
            <p className={cx('publicAddress')}>창업자 계좌번호</p>
            <p>{props.publicAddress}</p>
          </div>
        </div>
        <div className={cx('request')}>
            <button>요청 리스트</button>
          </div>
      </div>
    </div>
  )
}


export default ProjectContent;
