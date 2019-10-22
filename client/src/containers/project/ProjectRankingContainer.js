import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as projectActions from 'store/modules/project';
import ProjectRanking from 'components/project/ProjectRanking';
import Loading from 'components/common/Loader';

class ProjectRankingContainer extends Component {
  initialize = async () => {
    const { ProjectActions, id } = this.props;
    try {
      await ProjectActions.getProject(id);

    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {
    // const { loading, project } = this.props;

    // if(loading) return <Loading />;

    // const {
    //   title,
    //   project_image,
    //   body,
    // } = project.toJS();


    return (
        <ProjectRanking />
    );
  }
}

export default connect(
  (state) => ({
    project: state.project.get('project'),
    loading: state.pender.pending['project/GET_PROJECT'], // 로딩 상태
  }),
  (dispatch) => ({
    ProjectActions: bindActionCreators(projectActions, dispatch),
  })
)(withRouter(ProjectRankingContainer));
