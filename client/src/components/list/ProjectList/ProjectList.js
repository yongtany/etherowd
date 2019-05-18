import React from 'react';
import styles from './ProjectList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import ProjectItem from 'components/list/ProjectItem';
import { List } from 'immutable';

const cx = classNames.bind(styles);

const ProjectList = ({projects = List()}) => {
  const projectList = projects.map(
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
      <div className={cx('project-list')}>
        <div className={cx('container project-list')}>
          {/* header */}
          <div className={cx('header text-center')}>
            <h1><strong>Investments</strong></h1>
            <div className={cx('header-underline')}></div>
            <p className={cx('text-muted')}>투자 진행중인 프로젝트</p>
          </div>
          <div>
            <Link to="/project/new">
              <button className={cx('btn btn-primary')}>프로젝트 만들기</button>
            </Link>
          </div>
          {/* end of header */}
          <div className={cx('row')}>
            {projectList}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectList;
