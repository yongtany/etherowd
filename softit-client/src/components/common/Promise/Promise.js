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

          {/* header */}
          <div className={cx('header text-center')}>
            <h1><strong>promise</strong></h1>
            <div className="header-underline"></div>
            <p className={cx('text-muted')}>dlkfnd dlknfld dklnflk ldkfn, dlkfn dlnf</p>
          </div>
          {/* end of header */}
          <div className={cx('promise-icons')}>

            <div>
              <h2>
                <i className={cx('fa fa-thumbs-up')}></i> Promise
              </h2>
              <p className={cx('text-muted')}>dlkfnd dlknfld dklnflk ldkfn, dlkfn dlnf</p>
            </div>
            <div>
              <h2>
                <i className={cx('fa fa-thumbs-up')}></i> Promise
              </h2>
              <p className={cx('text-muted')}>dlkfnd dlknfld dklnflk ldkfn, dlkfn dlnf</p>
            </div>
            <div>
              <h2>
                <i className={cx('fa fa-thumbs-up')}></i> Promise
              </h2>
              <p className={cx('text-muted')}>dlkfnd dlknfld dklnflk ldkfn, dlkfn dlnf</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Promise;
