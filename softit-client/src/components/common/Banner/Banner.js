import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Banner.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Banner = () => (
  <section className={cx("banner")}>
    <div className={cx('banner-content')}>
      <div className={cx('banner-box')}>
        <h1><strong>Soft IT</strong></h1>
        <div className={cx("banner-underline")}></div>
        <Link to="#work" className={cx('link')}>WORK</Link>
      </div>

      <div className={cx("banner-icon")}>
        <Link to="#services" className={cx('icon')}><i className="fa fa-angle-double-down"></i></Link>
      </div>
    </div>
  </section>
)

export default Banner;
