import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Banner from 'components/common/Banner';
import Services from 'components/common/Services';
import Promise from 'components/common/Promise';
import RecentListContainer from 'containers/project/RecentListContainer';

const LandingPage = () => {
  return (
    <PageTemplate>
      <Banner />
      <Services />
      <Promise />
      <RecentListContainer />
    </PageTemplate>
  );
};

export default LandingPage;
