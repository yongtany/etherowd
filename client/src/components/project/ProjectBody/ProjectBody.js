import React from 'react';
import styles from './ProjectBody.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const ProjectBody = props => {
  return (
    <div className={cx('project-body col-md-8')}>
      <img
        src={props.project_image}
        alt={props.title}
      />
      <div
        id="projectBody"
      ></div>
    </div>
  )
}


export default ProjectBody;
