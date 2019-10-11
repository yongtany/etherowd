import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import web3 from 'ethereum/web3';
import moment from 'moment';

import * as projectActions from 'store/modules/project';
import ProjectHeader from 'components/project/ProjectHeader';
import ProjectBody from 'components/project/ProjectBody';
import ProjectContent from 'components/project/ProjectContent';
import ProjectWrapper from 'components/project/ProjectWrapper';
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

  async componentDidMount() {
    await this.initialize();
    const { project } = this.props;
    const { body } = project.toJS();

    document.getElementById('projectBody').innerHTML= body;
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {
    const { loading, project, isLoggedIn, match } = this.props;
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
      publishedDate,
      favoriteCount,
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
    } = project.toJS();

    const WeiToEther = web3.utils.fromWei(new web3.utils.BN(balance), 'ether');

    // 펀딩 경과 일수
    var now = moment(new Date());
    var publishedDateFomatDate = moment(publishedDate);
    var duration = moment.duration(now.diff(publishedDateFomatDate));
    var days = Math.floor(duration.asDays());

    return (
      <div>
        <ProjectHeader
        projectId={id}
        address={address}
        title={title}
        project_image={project_image}
        tags={tags}
        />
        <ProjectWrapper>
          <ProjectBody
          project_image={project_image}
          title={title}
          body={body}
          />
          <ProjectContent
            days={days}
            favoriteCount={favoriteCount}
            minimumContribution={minimumContribution}
            requestsCount={requestsCount}
            balance={WeiToEther}
            approversCount={approversCount}
            username={username}
            profile_image={profile_image}
            publicAddress={publicAddress}
            isLoggedIn={isLoggedIn}
          />
        </ProjectWrapper>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    isLoggedIn: state.auth.get('isLoggedIn'),
    project: state.project.get('project'),
    loading: state.pender.pending['project/GET_PROJECT'], // 로딩 상태
  }),
  (dispatch) => ({
    ProjectActions: bindActionCreators(projectActions, dispatch),
  })
)(withRouter(ProjectStoryContainer));
