import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';

class PageContainer extends Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <PageTemplate />
    );
  }
}

export default PageContainer;
