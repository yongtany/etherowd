import React from 'react';
import styles from './ProjectRanking.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const ProjectRanking = props => {
  return (
    <div className={cx('project-ranking col-md-8')}>
      <h3>Project Ranking Page</h3>
    </div>
  )
}


export default ProjectRanking;
