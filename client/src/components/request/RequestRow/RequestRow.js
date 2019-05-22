import React from 'react';
import web3 from 'ethereum/web3';

const RequestRow = props => (
      <tr>
        <th scope="row">{props.id+1}</th>
        <td>{props.description}</td>
        <td>{web3.utils.fromWei(props.value, 'ether')}</td>
        <td>{props.recipient}</td>
        <td>{props.approvalCount} / {props.approversCount}</td>
        <td><button className="btn btn-success">승인</button></td>
        <td><button className="btn btn-danger">종료</button></td>
      </tr>
)

export default RequestRow;
