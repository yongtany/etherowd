import React, { Component } from 'react';
import Project from 'ethereum/project';
import web3 from 'ethereum/web3';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

import ProjectContribute from 'components/project/ProjectContribute';

class ProjectContributeContainer extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    const { address } = this.props;
    const project = Project(address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const { history } = this.props;


      await project.methods.invest().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      window.location.reload();
      toast.success('투자에 성공하였습니다.');
      history.push(`/project/${this.props.address}`);

    } catch (err) {
      this.setState({ errorMessage: err.message });
      toast.error('요청이 취소되었습니다.');
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    const { onChange, onSubmit } = this;
    const { value, errorMessage, loading} = this.state;

    return (
      <ProjectContribute
        value={value}
        errorMessage={errorMessage}
        loading={loading}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    )
  }
}

export default withRouter(ProjectContributeContainer);
