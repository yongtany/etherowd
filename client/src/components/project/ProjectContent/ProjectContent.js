import React from 'react';
import styles from './ProjectContent.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const ProjectContent = props => {
  return (
    <div className={cx('project-content col-xs-3')}>
      hi
    </div>
  )
}


export default ProjectContent;
