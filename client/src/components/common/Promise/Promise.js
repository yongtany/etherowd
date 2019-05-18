import React from 'react';
import styles from './Promise.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Promise = () => (
  <section id="promise">
    <div className={cx('container-fluid')}>
      <div className={cx('row')}>
        <div className={cx('col-sm-6 promise-picture')}>
        </div>
        <div className={cx('col-sm-6 promise-text')}>

          <div className={cx('wow fadeInRight')} data-wow-duration="3s" data-wow-delay="1s">
          {/* header */}
          <div className={cx('header text-center')}>
            <h1><strong>promise</strong></h1>
            <div className="header-underline"></div>
            <p className={cx('text-muted')}></p>
          </div>
          {/* end of header */}
          <div className={cx('promise-icons')}>

            <div>
              <h2>
                <i className={cx('fa fa-thumbs-up')}></i> Peer to Peer
              </h2>
              <p className={cx('text-muted')}>이더리움을 통해 P2P 마켓 에스크로 계약</p>
            </div>
            <div>
              <h2>
                <i className={cx('fa fa-thumbs-up')}></i> Small to Giant project
              </h2>
              <p className={cx('text-muted')}>소규모 프로젝트도 간단한 심사 후 투자 유치 가능.</p>
            </div>
            <div>
              <h2>
                <i className={cx('fa fa-thumbs-up')}></i> Trasparent
              </h2>
              <p className={cx('text-muted')}>프로젝트의 진행상황을 보며 투자자들 불안함 해소.</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Promise;
