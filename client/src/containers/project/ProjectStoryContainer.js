import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import web3 from 'ethereum/web3';

import * as projectActions from 'store/modules/project';
import ProjectHeader from 'components/project/ProjectHeader';
import Loading from 'components/common/Loader';


class ProjectStoryContainer extends Component {
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

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {
    const { loading, project, match } = this.props;
    const { id } = match.params;

    if(loading) return <Loading />;

    const username = project.getIn(['user', 'username']);
    const profile_image = project.getIn(['user', 'profile_image']);
    const publicAddress = project.getIn(['user', 'publicAddress']);

    const {
      address,
      title,
      project_image,
      body,
      tags,
      favoriteCount,
      publishedDate,
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
    } = project.toJS();

    const WeiToEther = web3.utils.fromWei(new web3.utils.BN(balance), 'ether');

    return (
      <ProjectHeader
        projectId={id}
        address={address}
        title={title}
        project_image={project_image}
        tags={tags}
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
)(withRouter(ProjectStoryContainer));
