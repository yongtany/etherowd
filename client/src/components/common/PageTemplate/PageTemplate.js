import React from 'react'
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
    <div className={cx('page-template')}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
    </div>
);

export default PageTemplate;
