import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WOW from 'wow.js';
import styles from './Banner.scss';
import classNames from 'classnames/bind';
import web3 from 'ethereum/web3';

const cx = classNames.bind(styles);

class Banner extends Component  {
  componentDidMount() {
    new WOW().init();
  }

  handleAuthenticate = ({
    publicAddress,
    signature
  }) =>
    fetch(`/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());

  handleClick = async () => {
    const { onLoggedIn } = this.props;

    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }

    const publicAddress = coinbase.toLowerCase();

    this.setState({ loading: true });

    // Look if user with current publicAddress is already present on backend
    fetch(
      `/users?publicAddress=${publicAddress}`
    )
      .then(response => response.json())
      // If yes, retrieve it. If no, create it.
      .then(users =>
        users.length ? users[0] : this.handleSignup(publicAddress)
      )
      // Popup MetaMask confirmation modal to sign message
      .then(this.handleSignMessage)
      // Send signature to backend on the /auth route
      .then(this.handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch(err => {
        window.alert(err);
        this.setState({ loading: false });
      });
  };

  handleSignMessage = async ({
    publicAddress,
    nonce
  }) => {
    try {
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        '' // MetaMask will ignore the password argument here
      );
      return { publicAddress, signature };
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.');
    }
  };

  handleSignup = publicAddress => {
    return fetch(`/auth`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
  };

  render() {
    return (
      <section id="banner">
        <div className={cx('banner-content')}>
          <div className={cx('banner-box wow fadeInLeft')} data-wow-duration="3s" data-wow-delay="1s">
            <h1><strong>신뢰적 거래를 위한 이더리움 기반 크라우드 펀딩</strong><p>Etherowd</p></h1>

            <div className={cx("banner-underline")}></div>
            <div className={cx('link')} onClick={this.handleClick}>시작하기</div>
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
      </section>
    )
  }
}

export default Banner;
