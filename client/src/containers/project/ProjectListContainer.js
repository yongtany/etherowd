import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as listActions from 'store/modules/list';
import ProjectList from 'components/list/ProjectList';
import Loading from 'components/common/Loader';


class ProjectListContainer extends Component {
  getProjectList = () => {
    const { ListActions } = this.props;
    ListActions.getProjectList();
  }

  componentDidMount() {
    this.getProjectList();
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
