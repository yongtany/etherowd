import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as listActions from 'store/modules/list';
import RecentList from 'components/list/RecentList';

class RecentListContainer extends Component {
  getRecentsList = () => {
    const { ListActions } = this.props;
    ListActions.getRecentsList();
  }

  componentDidMount() {
    this.getRecentsList();
  }

  render() {
    const { recents } = this.props;

    return (
      <RecentList recents={recents} />
    );
  }
}

export default connect(
  (state) => ({
    recents: state.list.get('recents'),
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(RecentListContainer);
