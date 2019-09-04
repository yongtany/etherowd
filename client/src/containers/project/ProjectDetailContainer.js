import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import web3 from 'ethereum/web3';

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

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.project !== this.props.project) {
      this.initialize();
    }
  }

  render() {
    const { loading, project, match } = this.props;
    const { id } = match.params;

    const {
      address,
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    } = project.toJS();

    const WeiToEther = web3.utils.fromWei(new web3.utils.BN(balance), 'ether');

    if(loading) return <Loading />;

    return (
      <ProjectDetail
        projectId={id}
        address={address}
        minimumContribution={minimumContribution}
        balance={WeiToEther}
        requestsCount={requestsCount}
        approversCount={approversCount}
        manager={manager}
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
