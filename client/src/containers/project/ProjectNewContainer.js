import React, { Component } from 'react';
import ProjectNew from 'components/new/ProjectNew';
import factory from 'ethereum/factory';
import web3 from 'ethereum/web3';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import * as api from 'librarys/api';


class ProjectNewContainer extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    project_image: '',
    imagePreviewUrl: '',
    title:'',
    body: '',
    tags: []
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
    let project_image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        project_image: project_image,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(project_image)
  }

  handleTagsChange = (tags) => {
    this.setState({tags})
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { history } = this.props;
    this.setState({ loading: true, errorMessage: '' });
    const { title, body, project_image, tags, minimumContribution } = this.state;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('project_image', project_image);
    for (var i = 0; i < tags.length; i++) {
      formData.append('tags', tags[i]);
    }

    try {
      if (typeof parseInt(minimumContribution) === 'number' && minimumContribution !== '') {
        const accounts = await web3.eth.getAccounts();

        await api.createProject(formData);
        await factory.methods
          .createProject(minimumContribution)
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
    const { onChange, handleSubmit, handleImageChange, handleTagsChange } = this;
    const { title, body, project_image, minimumContribution, errorMessage, loading, tags, imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl}  className='img-preview thumbnail' alt={title}/>);
    } else {
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      $imagePreview = (<img className="thumbnail img-preview empty-image" alt='Enter an image' src="https://cdn3.iconfinder.com/data/icons/line-icons-large-version/64/photo-512.png" title="Preview Logo" />);
    }

    return (
      <ProjectNew
        title={title}
        body={body}
        project_image={project_image}
        minimumContribution={minimumContribution}
        errorMessage={errorMessage}
        loading={loading}
        onChange={onChange}
        handleImageChange={handleImageChange}
        handleTagsChange={handleTagsChange}
        handleSubmit={handleSubmit}
        imagePreview={$imagePreview}
        tags={tags}
       />
    );
  }
}

export default connect(
  (state) => ({
    title: state.new.get('title'),
    detail: state.new.get('detail'),
    pictures: state.new.get('pictures'),
    tags: state.new.get('tags')
  })
)(withRouter(ProjectNewContainer));
