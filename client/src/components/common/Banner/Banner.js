import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WOW from 'wow.js';
import styles from './Banner.scss';
import classNames from 'classnames/bind';

import AuthContainer from 'containers/auth/AuthContainer';

const cx = classNames.bind(styles);

class Banner extends Component  {
  state = {
    loading: false, // Loading button state
  };

  componentDidMount() {
    new WOW().init();
  }


  _changeAction = () => {
    this.setState(prevState => {
        const {action} = prevState;
        if(action === 'login'){
            return {
                action: 'signup'
            }
        } else if(action ==='signup'){
            return {
                action: 'login'
            };
        }
    });
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
          <AuthContainer />
        </div>

      </section>
    )
  }
}

export default Banner;
