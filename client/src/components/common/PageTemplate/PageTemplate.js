import React from 'react'
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import NavbarContainer from 'containers/common/NavbarContainer';
import Footer from 'components/common/Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
    <div className={cx('page-template')}>
        <NavbarContainer />
        <main>
          {children}
        </main>
        <Footer />
    </div>
);

export default PageTemplate;
