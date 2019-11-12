import React from 'react';
import styles from './RequestList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import RequestRow from 'components/request/RequestRow';
import Loading from 'components/common/Loader';

const cx = classNames.bind(styles);

const RequestList = ({ requests, address, approversCount, onApprove, onFinalize, me, loading }) => {
  const requestList = requests === undefined ? (
        <tr>
          <td>
            아직 개설자의 요청사항이 없습니다.
          </td>
        </tr>
    ) :
    requests.map(
    (request, index) => {
      const { description, value, recipient, approvalCount, reqeust_image, complete } = request.toJS();
      console.log()
      if(loading) return <Loading />;

      return (
        <RequestRow
          description={description}
          value={value}
          recipient={recipient}
          approvalCount={approvalCount}
          approversCount={approversCount}
          reqeust_image={reqeust_image}
          // onApprove={onApprove}
          // onFinalize={onFinalize}
          complete={complete}
          key={index}
          index={index}
          address={address}
          me={me}
        />
      )
    }
  );



  return (
      <div className={cx('request-list col-md-8')}>
          <div>
            {requestList}
          </div>
          <div>
            { me ? <Link to={`/project/${address}/requests/new`} className="right">
                <button className="btn btn-danger">
                  요청 추가
                </button>
              </Link> : <></>}
          </div>
          <div className={cx('container mt-5')}>
            <p className={cx('text-muted')}>* 승인은 투자자만 수행할 수 있습니다.</p>
            <p className={cx('text-muted')}>* 개설자의 요청이 합당하다면 승인해주세요.</p>
            <p className={cx('text-muted')}>* 승인이 과반수 이상이고 관리자가 종료하면 자동 인출/송금 됩니다.</p>
          </div>
      </div>
  )
}

export default RequestList;
