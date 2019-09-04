import React, { Component } from 'react';
import styles from './RequestRow.scss';
import classNames from 'classnames/bind';
import web3 from 'ethereum/web3';
import Project from 'ethereum/project';
import LoadingButton from 'components/common/LoadingButton';

import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

class RequestRow extends Component {
  state = {
    loadingA: false,
    loadingF: false,
  }

  onApprove = async () => {
    const { index, address, history } = this.props;
    const project = Project(address);
    this.setState({ loadingA: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await project.methods.approveRequest(index).send({
        from: accounts[0]
      });

      toast.success('승인하셨습니다.');
      history.push(`/project/${address}/requests`);
    } catch(err) {
      toast.error('트랜잭션 요청이 취소되었습니다.');
      console.log(err);
    }
    this.setState({ loadingA: false });
  };

  onFinalize = async () => {
    const { index, address, history, me, approvalCount, approversCount } = this.props;

    if(!me) {
      toast.error('관리자만 종료시킬수 있습니다.');
      return {};
    }

    if(approvalCount <= approversCount/2) {
      toast.error('투자자들 과반수 이상의 승인을 받아야합니다.');
      return {};
    }

    const project = Project(address);
    this.setState({ loadingF: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await project.methods.finalizeRequest(index).send({
        from: accounts[0]
      });

    toast.success('승인하셨습니다.');
    history.push(`/project/${address}/requests`);
    } catch (err) {
      console.log(err);
    }
    this.setState({ loadingF: false });
  };

  render() {
    const { onApprove, onFinalize } = this;
    const { index, description, recipient, value, approvalCount, approversCount, complete } = this.props;
    return (
      <tr className={cx(`${complete && 'complete'}`)}>
        <th scope="row">{index+1}</th>
        <td>{description}</td>
        <td>{web3.utils.fromWei(value, 'ether')}</td>
        <td>{recipient}</td>
        <td>{approvalCount} / {approversCount}</td>
        <td>
        {
          this.state.loadingA ?
          <LoadingButton
            type={"success"}
          />
           : <button className={cx(`btn btn-success ${ complete && 'disabled'}`)} disabled={complete} onClick={onApprove}>승인</button>
        }
        </td>
        <td>
        {
          this.state.loadingF ?
          <LoadingButton
            type={"danger"}
          />
          : <button className={cx(`btn btn-danger ${ complete && 'disabled'}`)} disabled={complete} onClick={onFinalize}>종료</button>
        }
        </td>
      </tr>
    )
  }
}

export default withRouter(RequestRow);
