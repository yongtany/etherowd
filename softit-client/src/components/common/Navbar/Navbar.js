import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Navbar = () => (
  <nav className={cx("navbar navbar-expand-md navbar-default bg-dark fixed-top")}>
    <div className={cx("container")}>
      <Link className={cx("navbar-brand")} to="#">
            Soft IT
      </Link>
      <button className={cx("navbar-toggler")} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className={cx("navbar-toggler-icon")}></span>
      </button>
      <div className={cx("collapse navbar-collapse")} id="navbarResponsive">
        <ul className={cx("navbar-nav ml-auto")}>
          <li className={cx('nav-item active')}>
            <Link className={cx('nav-link')} to="#banner">
              <span className={cx('fas fa-home')}></span>
            </Link>
          </li>
          <li className={cx("nav-item")}>
            <a className={cx("nav-link")} href="#services">Service</a>
          </li>
          <li className={cx("nav-item")}>
            <a className={cx("nav-link")} href="#promise">Promise</a>
          </li>
          <li className={cx("nav-item")}>
            <a className={cx("nav-link")} href="#banner">Banner</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
