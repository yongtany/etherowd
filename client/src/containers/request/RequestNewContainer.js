import React, { Component } from 'react';
import RequestNew from 'components/request/RequestNew';
import Project from 'ethereum/project';
import web3 from 'ethereum/web3';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import * as api from 'librarys/api';

class RequestNewContainer extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    request_image: '',
    imagePreviewUrl: '',
    errorMessage: ''
  };

  handleImageChange = this.handleImageChange.bind(this);

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let request_image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        request_image: request_image,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(request_image)
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { id, history, token } = this.props;
    this.setState({ loading: true, errorMessage: '' });
    const project = Project(id);
    const { description, value, recipient, request_image } = this.state;

    const formData = new FormData();
    formData.append('description', description);
    formData.append('request_image', request_image);

    try {
      if(typeof parseInt(value) === 'number' && value !== '') {
        if(recipient !== '') {
          if(description !== '') {
            if(request_image !== '') {
              const accounts = await web3.eth.getAccounts();
              await project.methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({ from: accounts[0] });

              await api.requestOnProject(this.props.id, formData, token);

              history.push(`/project/${this.props.id}/requests`);
              toast.success('성공적으로 요청이 생성되었습니다.');
            }  else {
              toast.error('요청 이미지를 등록해주세요.');
            }
          } else {
            toast.error('요청사항을 입력하세요.');
          }
        } else {
          toast.error('배송 계좌를 입력하세요.');
        }
      } else {
        toast.error('금액을 정확히 입력해주세요.');
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };


  render() {
    const { id } = this.props;
    const { value, description, recipient, request_image, imagePreviewUrl, loading, errorMessage } = this.state;
    const { handleChange, handleImageChange, handleSubmit } = this;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl}  className='img-preview thumbnail' alt={description}/>);
    } else {
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      $imagePreview = (<img className="thumbnail img-preview empty-image" alt='Enter an image' src="https://cdn3.iconfinder.com/data/icons/line-icons-large-version/64/photo-512.png" title="Preview Logo" />);
    }

    return (
      <RequestNew
        id={id}
        value={value}
        errorMessage={errorMessage}
        loading={loading}
        recipient={recipient}
        description={description}
        request_image={request_image}
        onChange={handleChange}
        imageChange={handleImageChange}
        imagePreview={$imagePreview}
        onSubmit={handleSubmit}
       />
    );
  }
}

export default connect(
  (state) => ({
    token: state.auth.get('token'),
  })
)(withRouter(RequestNewContainer));
