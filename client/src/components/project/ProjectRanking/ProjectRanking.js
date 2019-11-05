import React from 'react';
import styles from './ProjectRanking.scss';
import classnames from 'classnames/bind';
import InvestorItem from 'components/user/InvestorItem';

const cx = classnames.bind(styles);

const ProjectRanking = ({ investors= [], approversCount }) => {
  const investorList = investors.map(
    (investor) => {
      const { username, profile_image, donation } = investor;
      return (
        <InvestorItem
          username={username}
          profile_image={profile_image}
          donation={donation}
        />
      )
    }
  )

  return (
    <div className={cx('project-ranking col-md-8')}>
      <div className={cx('ranking-header')}>
        <p>현재 이 프로젝트에</p>
        <p><span>{approversCount}</span> 명의 참여가 이루어졌습니다.</p>
      </div>
      {investorList}
    </div>
  )
}


export default ProjectRanking;
