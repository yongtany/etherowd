import React from 'react';
import styles from './RequestList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import RequestRow from 'components/request/RequestRow';
import Loading from 'components/common/Loader';

const cx = classNames.bind(styles);

const RequestList = ({ requests, address, approversCount, onApprove, onFinalize, me }) => {

  if(requests === undefined) {
    return <Loading />
  }

  const requestList = requests.map(
    (request, index) => {
      return (
        <RequestRow
          description={request.description}
          value={request.value}
          recipient={request.recipient}
          approvalCount={request.approvalCount}
          approversCount={approversCount}
          onApprove={onApprove}
          onFinalize={onFinalize}
          complete={request.complete}
          key={index}
          index={index}
          address={address}
          me={me}
        />
      )
    }
  );

  return (
    <section id="services">
      <div className={cx('project-list')}>
        <div className={cx('container project-list')}>
          <div className={cx('header text-center')}>
            <h1><strong>Request</strong></h1>
            <div className={cx('header-underline')}></div>
            <p className={cx('text-muted')}>프로젝트를 진행하기 위해 발생한 요청사항입니다.</p>
          </div>
          <div>
            <Link to={`/project/${address}`}>
              <button className="btn btn-back">
                뒤로 가기
              </button>
            </Link>
            { me ? <Link to={`/project/${address}/requests/new`} className="right">
              <button className="btn btn-danger">
                요청 추가
              </button>
            </Link> : <></>}

          </div>

          <div className="container">
            <table className="table mt-5">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">요청 사항</th>
                  <th scope="col">비용</th>
                  <th scope="col">거래자</th>
                  <th scope="col">승인 수</th>
                  <th scope="col"><span className="pl-2">승인</span></th>
                  <th scope="col"><span className="pl-2">종료</span></th>
                </tr>
              </thead>
              <tbody>
                {requestList}
              </tbody>
            </table>
          </div>
          <div className={cx('container mt-5')}>
            <p className={cx('text-muted')}>* 승인은 투자자만 수행할 수 있습니다.</p>
            <p className={cx('text-muted')}>* 개설자의 요청이 합당하다면 승인해주세요.</p>
            <p className={cx('text-muted')}>* 승인이 과반수 이상이고 관리자가 종료하면 자동 인출/송금 됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RequestList;
