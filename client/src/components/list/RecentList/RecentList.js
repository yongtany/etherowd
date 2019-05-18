import React from 'react';
import styles from './RecentList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import ProjectItem from 'components/list/ProjectItem';
import { List } from 'immutable';

const cx = classNames.bind(styles);

const RecentList = ({recents= List()}) => {
  const recentsList = recents.map(
    (address) => {
      return (
        <ProjectItem
          address={address}
          key={address}
        />
      )
    }
  );

  return (
    <section id="services">
      <div className={cx('container')}>
        {/* header */}
        <div className={cx('header text-center')}>
          <h1><strong>Investments</strong></h1>
          <div className={cx('header-underline')}></div>
          <p className={cx('text-muted')}>신규 프로젝트</p>
        </div>
        {/* end of header */}
        <div className={cx('row')}>
           {recentsList}
        </div>
        <div>
          <Link to="/project/new">
            <button className={cx('btn btn-primary')}>프로젝트 만들기</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RecentList;
