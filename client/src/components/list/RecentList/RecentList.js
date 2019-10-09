import React from 'react';
import styles from './RecentList.scss';
import classNames from 'classnames/bind';

import ProjectItem from 'components/list/ProjectItem';


const cx = classNames.bind(styles);

const RecentList = ({ recents }) => {
  const recentsList = recents.map(
    (recent) => {
      const { address, title, project_image, tags } = recent.toJS();
      return (
        <ProjectItem
          title={title}
          project_image={project_image}
          address={address}
          tags={tags}
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
      </div>
    </section>
  )
}

export default RecentList;
