import React from 'react';
import styles from './InvestorItem.scss';
import classNames from 'classnames/bind';
import web3 from 'ethereum/web3';
// import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const InvestorItem = ({ username, profile_image, donation }) => {
  const WeiToEther = web3.utils.fromWei(new web3.utils.BN(donation), 'ether');

  return (
      <div className={cx('investor-item')}>
        {/* <Link className={cx('link')} to={`/user/${username}`}> */}
            <img className="investor-image" src={profile_image} alt={username} />
            <div className="investor-body">
              <p className="paragraph"><span>{username}</span>님이 <span>{WeiToEther}</span> ether 펀딩으로 참여 하셨습니다.</p>
            </div>
        {/* </Link> */}
      </div>
  )
};

export default InvestorItem;
