import React from 'react'
import styles from './ProjectWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProjectWrapper = ({children}) => (
    <div className={cx('project-wrapper container')}>
      <main>
        <div className={cx('row')}>
          {children}
        </div>
      </main>
    </div>
);

export default ProjectWrapper;
