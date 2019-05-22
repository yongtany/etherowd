import React, { Component } from 'react';
import RequestNew from 'components/request/RequestNew';
import Project from 'ethereum/project';
import web3 from 'ethereum/web3';

import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

class RequestNewContainer extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: ''
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    const { id, history } = this.props;

    const project = Project(id);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await project.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      history.push(`/project/${this.props.id}/requests`);
      toast.success('성공적으로 요청이 생성되었습니다.');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };


  render() {
    const { id } = this.props;
    const { value, description, recipient, loading, errorMessage } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <RequestNew
        id={id}
        value={value}
        errorMessage={errorMessage}
        loading={loading}
        recipient={recipient}
        description={description}
        onChange={onChange}
        onSubmit={onSubmit}
       />
    );
  }
}

export default withRouter(RequestNewContainer);
