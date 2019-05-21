import React, { Component } from 'react';
import ProjectNew from 'components/new/ProjectNew';
import factory from 'ethereum/factory';
import web3 from 'ethereum/web3';

import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

class ProjectNewContainer extends Component {
  state = {
    minimumContribution: '',
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
    const { history } = this.props;
    this.setState({ loading: true, errorMessage: '' });
    const { minimumContribution } = this.state;

    try {
      if (typeof parseInt(minimumContribution) === 'number' && minimumContribution !== '') {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
          .createProject(this.state.minimumContribution)
          .send({
            from: accounts[0]
          });

        history.push('/projects');
      }
      else {
        toast.error('금액을 정확히 입력해주세요.');
      }

      toast.success("프로젝트가 생성되었습니다.");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { minimumContribution, errorMessage, loading } = this.state;

    return (
      <ProjectNew
        minimumContribution={minimumContribution}
        errorMessage={errorMessage}
        loading={loading}
        onChange={onChange}
        onSubmit={onSubmit}
       />
    );
  }
}

export default withRouter(ProjectNewContainer);
