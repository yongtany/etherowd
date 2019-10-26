import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as projectActions from 'store/modules/project';
import ProjectHeader from 'components/project/ProjectHeader';

import Loading from 'components/common/Loader';

class ProjectHeaderContainer extends Component {


  initialize = async () => {
    const { ProjectActions, id } = this.props;
    try {
      await ProjectActions.getProject(id);

    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    await this.initialize();
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {
    const { loading, project, match } = this.props;
    const { id } = match.params;

    if(loading) return <Loading />;

    const {
      address,
      title,
      project_image,
      tags,
      requestsCount
    } = project.toJS();

    console.log(typeof requestsCount)

    return (
        <ProjectHeader
          projectId={id}
          address={address}
          title={title}
          project_image={project_image}
          tags={tags}
          requestsCount={requestsCount}
        />
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
)(withRouter(ProjectHeaderContainer));
