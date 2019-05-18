import React from 'react';
import styles from './Services.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Services = () => (
  <section id="services">
    <div className={cx('container')}>
      {/* header */}
      <div className={cx('header text-center')}>
        <h1><strong>services</strong></h1>
        <div className={cx('header-underline')}></div>
        <p className={cx('text-muted')}> 이더리움을 통해 P2P 마켓 에스크로 계약</p>
      </div>
      {/* end of header */}
      <div className={cx('row')}>
        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx("fas fa-search-dollar")}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>투자금이 필요한 당신 투자자들에게 투자 받습니다.</p>
        </div>

        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx("fas fa-coins")}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>블록체인 기반 플랫폼 이기 때문에 신뢰성이 보장되어 있습니다. </p>
        </div>

        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx('fa fa-user-shield')}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>투자자와 사업자 간의 신뢰성, 안정성 확보 가능.</p>
        </div>

      </div>
    </div>
  </section>
)

export default Services;
