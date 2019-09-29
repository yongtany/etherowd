import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WOW from 'wow.js';
import styles from './Banner.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

class Banner extends Component  {
  state = {
    loading: false, // Loading button state
  };

  componentDidMount() {
    new WOW().init();
  }

  render() {
    return (
      <section id="banner">
        <div className={cx('banner-content')}>
          <div className={cx('banner-box wow fadeInLeft')} data-wow-duration="3s" data-wow-delay="1s">
            <h1><strong>신뢰적 거래를 위한 이더리움 기반 크라우드 펀딩</strong><p>Etherowd</p></h1>

            <div className={cx("banner-underline")}></div>
            <div className={cx('link')} data-toggle="modal" data-target="#exampleModalCenter">시작하기</div>
            <Link to="#signin" className={cx('link')}>자세히보기</Link>
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
        <div>
        </div>
      </section>
    )
  }
}

export default Banner;
