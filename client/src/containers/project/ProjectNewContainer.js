import React, { Component } from 'react';
import ProjectNew from 'components/new/ProjectNew';
import factory from 'ethereum/factory';
import web3 from 'ethereum/web3';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

class ProjectNewContainer extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    file: '',
    imagePreviewUrl: ''
  };
  handleImageChange = this.handleImageChange.bind(this);

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
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
        toast.success("프로젝트가 생성되었습니다.");
      }
      else {
        toast.error('금액을 정확히 입력해주세요.');
      }


    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };


  render() {
    const { onChange, onSubmit, handleImageChange } = this;
    const { minimumContribution, errorMessage, loading } = this.state;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl}  className='img-preview thumbnail' alt={'hi'}/>);
    }

    return (
      <ProjectNew
        minimumContribution={minimumContribution}
        errorMessage={errorMessage}
        loading={loading}
        onChange={onChange}
        handleImageChange={handleImageChange}
        onSubmit={onSubmit}
        imagePreview={$imagePreview}
       />
    );
  }
}

export default connect(
  (state) => ({
    title: state.new.get('title'),
    detail: state.new.get('detail'),
    pictures: state.new.get('pictures'),
  })
)(withRouter(ProjectNewContainer));
