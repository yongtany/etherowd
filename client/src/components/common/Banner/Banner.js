import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WOW from 'wow.js';
import styles from './Banner.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const cx = classNames.bind(styles);

class Banner extends Component  {
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
            {this.props.isLoggedIn ?
            <Link to="/project/new" className={cx('link')}>시작하기</Link>
            :
            <div className={cx('link')} data-toggle="modal" data-target="#authModal">시작하기</div>
            }
            <Link to="/projects" className={cx('link')}>자세히보기</Link>
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

export default connect(
  (state) => ({
    isLoggedIn: state.auth.get('isLoggedIn'),
  }),
)(withRouter(Banner));
