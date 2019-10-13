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
  state = {
    isInvestor: false,
  }

  initialize = async () => {
    const { ProjectActions, id } = this.props;
    try {
      await ProjectActions.getProject(id);
      await ProjectActions.getRank(id);

    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    await this.initialize();
    await this.isInvestor();
    const { project } = this.props;
    const { body } = project.toJS();

    document.getElementById('projectBody').innerHTML= body;
  }

  isInvestor = async () => {
    const { project } = this.props;
    const { investors } = project.toJS();
    const managerAddress = project.getIn(['user', 'publicAddress']);
    const coinbase = await web3.eth.getCoinbase();
    const publicAddress = coinbase.toLowerCase();

    try {
      if(managerAddress === publicAddress) {
        this.setState({
          isInvestor: true
        })
      }
      for(var i = 0; i < investors.length; i++) {
        if(investors[i].investorAddress.toLowerCase() === publicAddress) {
          this.setState({
            isInvestor: true
          })
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {
    const { loading, project, isLoggedIn, match } = this.props;
    const { id } = match.params;
    const { isInvestor } = this.state;

    if(loading) return <Loading />;

    const manager = project.getIn(['user', 'username']);
    const profile_image = project.getIn(['user', 'profile_image']);
    const managerAddress = project.getIn(['user', 'publicAddress']);

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
            address={address}
            days={days}
            favoriteCount={favoriteCount}
            minimumContribution={minimumContribution}
            requestsCount={requestsCount}
            balance={WeiToEther}
            approversCount={approversCount}
            manager={manager}
            profile_image={profile_image}
            managerAddress={managerAddress}
            isLoggedIn={isLoggedIn}
            isInvestor={isInvestor}
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
    // investors: state.project.get('investors'),
    loading: state.pender.pending['project/GET_PROJECT'], // 로딩 상태
  }),
  (dispatch) => ({
    ProjectActions: bindActionCreators(projectActions, dispatch),
  })
)(withRouter(ProjectStoryContainer));
