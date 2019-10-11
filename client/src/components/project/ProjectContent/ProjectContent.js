import React from 'react';
import styles from './ProjectContent.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const ProjectContent = props => {
  return (
    <div className={cx('project-content col-md-3')}>
      <div>
        <p>{props.days}</p>
      </div>
    </div>
  )
}


export default ProjectContent;
