import React from 'react';
import styles from './ProjectNew.scss';
import classNames from 'classnames/bind';

import LoadingButton from 'components/common/LoadingButton';
import Editor from 'components/new/Editor';
import ImageUploader from 'react-images-upload';
const cx = classNames.bind(styles);

const ProjectNew = props => (
      <div className={cx('new-wrapper')}>
        <div className={cx('project-new')}>
          <div className={cx('header text-center')}>
            <h1><strong>Create</strong></h1>
            <div className={cx('header-underline')}></div>
            <p className={cx('text-muted')}>프로젝트를 개설하세요.</p>
          </div>
          <div className={cx('new-content')}>
            <form onSubmit={props.onSubmit} className={cx('form-wrapper')}>
              <div className="form-group">
                <div className="container">
                  <div className="row">
                    <div className={cx('col-sm-6')}>
                      <label>제목을 입력하세요.</label>
                      <input
                        className="form-control"
                        value={props.title}
                        onChange={props.onChange}
                        name="title"
                        placeholder="Title"
                      />
                      <small id="Help" className="form-text text-muted">목표금액에 도달해야 프로젝트를 진행하실수 있습니다.</small>
                      <label>목표금액을 설정하세요.</label>

                      <input
                        className="form-control"
                        value={props.minimumContribution}
                        onChange={props.onChange}
                        name="minimumContribution"
                        placeholder="Ether"
                      />
                      <small id="Help" className="form-text text-muted">목표금액에 도달해야 프로젝트를 진행하실수 있습니다.</small>
                    </div>
                    <div className="col-sm-6">
                      <div class="form-group">
                        <label>프로젝트 이미지를 등록하세요.</label>
                        <div class="main-img-preview">
                          {props.imagePreview}
                        </div>
                        <div class="input-group">
                          <input id="fakeUploadLogo" class="form-control fake-shadow" placeholder="Choose File" disabled="disabled" />
                          <div class="input-group-btn">
                            <div class="fileUpload btn btn-danger fake-shadow">
                              <span><i class="glyphicon glyphicon-upload"></i> Upload Logo</span>
                              <input id="logo-id" name="logo" type="file" onChange={props.handleImageChange} class="attachment_upload" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Editor />
              {
                props.loading ?
                  <LoadingButton
                    type={"primary"}
                  />
                : <button className="btn btn-primary">개설하기</button>
              }
            </form>
          </div>
        </div>
      </div>
);

export default ProjectNew;
