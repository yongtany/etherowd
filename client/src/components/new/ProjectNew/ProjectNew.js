import React from 'react';
import styles from './ProjectNew.scss';
import classNames from 'classnames/bind';

import LoadingButton from 'components/common/LoadingButton';
import Editor from 'components/new/Editor';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

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
            <form onSubmit={props.handleSubmit} className={cx('form-wrapper')}>
              <div className="form-group">
                <div className="container">
                  <div className="row">
                    <div className={cx('col-sm-6')}>
                      <label className="input-label">제목을 입력하세요.</label>
                      <input
                        className="form-control"
                        value={props.title}
                        onChange={props.onChange}
                        name="title"
                        placeholder="Title"
                      />
                      <small id="Help" className="form-text text-muted">프로젝트 제목을 입력하세요.</small>

                      <label className="input-label">최소투자액 설정하세요.</label>
                      <input
                        className="form-control"
                        value={props.minimumContribution}
                        onChange={props.onChange}
                        name="minimumContribution"
                        placeholder="Ether"
                      />
                      <small id="Help" className="form-text text-muted">투자자들은 이 최소투자액부터 투자 가능합니다.</small>

                      <label className="input-label">태그를 입력하세요.</label>
                      <TagsInput
                        value={props.tags}
                        onChange={props.handleTagsChange}
                       />
                       <small id="Help" className="form-text text-muted">태그를 통해 투자자들에게 검색됩니다.</small>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="input-label">프로젝트 이미지를 등록하세요.</label>
                        <div className="main-img-preview">
                          {props.imagePreview}
                        </div>
                        <div className="input-group">
                          <input id="fakeUploadLogo" className="form-control fake-shadow" placeholder="Choose File" disabled="disabled" />
                          <div className="input-group-btn">
                            <div className="fileUpload btn btn-danger fake-shadow">
                              <span><i className="glyphicon glyphicon-upload"></i> Upload Logo</span>
                              <input
                                id="logo-id"
                                name={props.project_image}
                                type="file"
                                onChange={props.handleImageChange}
                                className="attachment_upload"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Editor
                body={props.body}
                handleIsSave={props.handleIsSave}
                onChange={props.handleBodyChange}

              />
              <div className="mt-5 mb-5 submit">
                {
                  props.loading ?
                    <LoadingButton
                      type={"primary"}
                    />
                  : <button className="btn btn-primary">프로젝트 개설하기</button>
                }
              </div>

            </form>
          </div>
        </div>
      </div>
);

export default ProjectNew;
