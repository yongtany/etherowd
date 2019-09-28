import React, { Component } from 'react';

class SignupForm extends Component {
  handleInputChange = (e) => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput({name, value});
  }


  handleFileChange =(e) => {
    const { onChangeFileInput } = this.props;
    const { files } = e.target;

    onChangeFileInput({
      files
    });
  }

  render() {
    const { handleInputChange, handleFileChange }  = this;
    const { loading, username, profile_image, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label to="exampleFormControlInput1">닉네임을 입력하세요.</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="닉네임 입력" />
        </div>
        <div className="form-group">
          <label to="exampleFormControlFile1">프로필 이미지를 선택하세요.</label>
          <input
            type="file"
            className="form-control-file"
            name={profile_image}
            onChange={handleFileChange}
          />
        </div>
        <input
          className="Login-button Login-mm"
          type="submit"
          name="Submit"
        />
          {/* <img
              src={require('images/metamask-icon.png')}
              className="mm-icon"
              alt="metamask"
            /> */}
      </form>
    )
  }
}

export default SignupForm;
