import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as projectActions from 'store/modules/project';
import ProjectDetail from 'components/project/ProjectDetail';
import Loading from 'components/common/Loader';


class ProjectDetailContainer extends Component {
  initialize = async () => {
    const { ProjectActions, id } = this.props;
    try {
      await ProjectActions.getProject(id);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { loading, project, match } = this.props;
    const { id } = match.params;
    const obj = Object.values(project);
    console.log(obj);
    if(loading) return <Loading />;

    return (
      <ProjectDetail
        projectId={id}
      />
    );
  }
}

export default connect(
  (state) => ({
    project: state.project.get('project'),
    loading: state.pender.pending['project/GET_POST'], // 로딩 상태
  }),
  (dispatch) => ({
    ProjectActions: bindActionCreators(projectActions, dispatch),
  })
)(withRouter(ProjectDetailContainer));
