import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectContent.scss';
import classnames from 'classnames/bind';
import { HeartEmpty } from 'components/common/Icons'
import Loading from 'components/common/Loader';

const cx = classnames.bind(styles);

const ProjectContent = props => {
  if(props.loading) return  <Loading />;
  const { investors = [] } = props;
  const bestInvestorList = investors.map(
      (investor) => {
        const { profile_image, username } = investor;
        return (
          <div className={cx('investor')}>
            <img src={profile_image} alt={username} />
            <p>{username}</p>
          </div>
        )
      }
    )
  return (
    <div className={cx('project-content col-md-4')}>
      <div className={cx('upperBox')}>
        <p className={cx('days')}>{props.days}일째 펀딩중</p>
        <p className={cx('paragraph')}><span className={cx('focus')}>{props.balance}</span> Ether 펀딩</p>
        <p className={cx('paragraph')}><span className={cx('focus')}>{props.approversCount}</span> 명의 투자자</p>
        <p className={cx('paragraph')}>최소 투자액 <span className={cx('focus')}>{props.minimumContribution}</span> Wei</p>
        <p className={cx('paragraph')}>투자자 요청 <span className={cx('focus')}>{props.requestsCount}</span>건</p>
      </div>
      {props.isLoggedIn ?
      <button
        className={'funding-button'}
        data-toggle="modal"
        data-target="#fundingTarget"
      >투자하기</button>
      :
      <button
        className={'funding-button'}
        data-toggle="modal"
        data-target="#authModal"
      >투자하기</button>
      }
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
            alt={props.manager}
          />
          <div className={cx('col-md-7 profile')}>
            <h6>{props.manager}</h6>
            <p className={cx('publicAddress')}>창업자 계좌번호</p>
            <p>{props.managerAddress}</p>
          </div>
        </div>

        <div className={cx('request')}>
          {props.isLoggedIn ?
            props.isInvestor ?
            <Link to={`/project/${props.address}/requests`}>
              <button
              className={'funding-button'}
            >요청 리스트</button>
            </Link>
            :
            <button
              className={'funding-button'}
              data-toggle="modal"
              data-target="#fundingTarget"
            >요청 리스트</button>
            :
            <button
              className={'funding-button'}
              data-toggle="modal"
              data-target="#authModal"
            >요청 리스트</button>
            }
        </div>

        <p>베스트 투자자</p>
        <div className={cx('info-content2')}>
          <div className={cx('best-investors')}>
            {bestInvestorList}
          </div>
          <p className={cx('more')}><Link to ={`/project/${props.address}/investors`}>더보기</Link></p>
        </div>
      </div>
    </div>
  )
}


export default ProjectContent;
