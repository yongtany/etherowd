import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WOW from 'wow.js';
import styles from './Banner.scss';
import classNames from 'classnames/bind';

import NavbarContainer from 'containers/common/NavbarContainer';

const cx = classNames.bind(styles);

class Banner extends Component  {
  componentDidMount() {
    new WOW().init();
  }

  render() {
    return (
      <section id="banner">
         {/* Navbar */}
        <NavbarContainer />

        <div className={cx('banner-content')}>
          <div className={cx('banner-box')}>
            <h1><strong>Soft IT</strong></h1>
            <div className={cx("banner-underline")}></div>
            <Link to="#signin" className={cx('link')}>Sign In</Link>
          </div>

          <div className={cx("banner-icon")}>
            <Link
              to="#services"
              className={cx('icon wow bounce')}
              data-wow-iteration="infinite"
              data-wow-duration="4s">
              <i className="fa fa-angle-double-down"></i>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default Banner;
