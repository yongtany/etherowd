import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as requestActions from 'store/modules/request';
import RequestList from 'components/request/RequestList';
import Loading from 'components/common/Loader';


class RequestListContinaer extends Component {
  getRequestList = () => {
    const { RequestActions, id } = this.props;
    RequestActions.getRequestList(id);
  }

  componentDidMount() {
    this.getRequestList();
    window.scrollTo(0,0);
  }

  render() {
    const { requests, loading, id } = this.props;


    if(loading) return <Loading />;

    return (
      <RequestList
        requests={requests}
        id={id}
      />
    );
  }
}

export default connect(
  (state) => ({
    requests: state.request.get('requests'),
    loading: state.pender.pending['list/GET_REQUEST_LIST'],
  }),
  (dispatch) => ({
    RequestActions: bindActionCreators(requestActions, dispatch)
  })
)(RequestListContinaer);
