import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import web3 from 'ethereum/web3'
import Project from 'ethereum/project';
import * as requestActions from 'store/modules/request';
import RequestList from 'components/request/RequestList';


class RequestListContinaer extends Component {
  state = {
    me: false
  }

  getRequestList = () => {
    const { RequestActions, id } = this.props;
    RequestActions.getRequestList(id);
  }

  itsme = async () => {
    const { id } = this.props;
    const project = Project(id);

    const summary = await project.methods.getSummary().call();
    const manager = summary[4];
    const accounts = await web3.eth.getAccounts();
    const me = accounts[0];

    if(manager === me) {
      this.setState({ me : true });
    }
  }

  componentDidMount() {
    this.getRequestList();
    this.itsme();
    window.scrollTo(0,0);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.requests !== this.props.requests) {
      this.getRequestList();
    }
  }

  render() {
    const { requests, approversCount, id } = this.props;
    const { me } = this.state;
    return (
      <RequestList
        requests={requests}
        approversCount={approversCount}
        address={id}
        me={me}
      />
    );
  }
}

export default connect(
  (state) => ({
    manager: state.project.get('manager'),
    requests: state.request.get('requests'),
    approversCount: state.request.get('approversCount'),
    loading: state.pender.pending['list/GET_REQUEST_LIST'],
  }),
  (dispatch) => ({
    RequestActions: bindActionCreators(requestActions, dispatch)
  })
)(RequestListContinaer);
