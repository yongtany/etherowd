import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as listActions from 'store/modules/list';
import ProjectList from 'components/list/ProjectList';
import Loading from 'components/common/Loader';


class ProjectListContainer extends Component {
  getProjectList = () => {
    // 페이지와 태그 값을 부모로부터 받아 옵니다.
    const { tag, page, ListActions } = this.props;
    ListActions.getProjectList({
      page,
      tag,
    });
  }

  componentDidMount() {
    this.getProjectList();
    window.scrollTo(0,0);
  }

  componentDidUpdate(prevProps, prevState) {
    // 페이지/태그가 바뀔 때 리스트를 다시 불러옵니다.
    if(prevProps.page !== this.props.page || prevProps.tag !== this.props.tag) {
      this.getPostList();
      // 스크롤을 맨 위로 올립니다.
      document.documentElement.scrollTop = 0;
    }
    window.scrollTo(0,0);
  }

  render() {
    const { projects, loading } = this.props;

    if(loading) return <Loading />;

    return (
      <ProjectList projects={projects} />
    );
  }
}

export default connect(
  (state) => ({
    projects: state.list.get('projects'),
    loading: state.pender.pending['list/GET_PROJECT_LIST'],
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ProjectListContainer);
