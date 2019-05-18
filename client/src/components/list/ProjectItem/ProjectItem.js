import React from 'react';
import styles from './ProjectItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProjectItem = ({ address }) => (
  <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
    <i className={cx("fas fa-search-dollar")}></i>
    <p><strong>{address}</strong></p>
    <Link to={`/project/${address}`}>
    <p className={cx('text-muted')}>지금 투자하세요.</p>
    </Link>
  </div>
);

export default ProjectItem;
