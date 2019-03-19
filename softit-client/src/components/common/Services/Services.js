import React from 'react';
import styles from './Services.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Services = () => (
  <section className={cx('services')}>
    <div className={cx('container')}>
      {/* header */}
      <div className={cx('header text-center')}>
        <h1><string>services</string></h1>
        <div className={cx('header-underline')}></div>
        <p className={cx('text-muted')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text </p>
      </div>
      {/* end of header */}
      <div className={cx('row')}>
        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx('fa fa-desktop')}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>

        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx('fa fa-mobile')}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>

        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx('fa fa-archive')}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>

        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx('fa fa-cubes')}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>

        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx('fa fa-envelope')}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>

        <div className={cx('col-md-4 col-sm-6 services-container text-center')}>
          <i className={cx('fa fa-magnet')}></i>
          <h2><strong>Service</strong></h2>
          <p className={cx('text-muted')}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>
      </div>
    </div>
  </section>
)

export default Services;
