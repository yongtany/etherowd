import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="page-footer font-small bg-dark pt-4">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase text-light">Etherowd</h5>
          <p className="text-light">신뢰적 거래를 위한 이더리움 기반 크라우드 펀딩.</p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-3" />
        <div className="col-md-3 mb-md-0 mb-3">
        </div>
        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase text-light">Investments</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/projects" className="text-light">투자하기</Link>
            </li>
            <li>
              <Link to="/project/new" className="text-light">프로젝트 만들기</Link>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <div className="footer-copyright text-center py-3 text-light">© 2019 Copyright:
      <Link to="#" className="text-light">Yongtany</Link>
    </div>
  </div>
  )
}

export default Footer;

