import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectNewContainer from 'containers/project/ProjectNewContainer';
// import ProjectNew from 'components/new/ProjectNew';

const NewProjectPage = () => {
  return (
    <PageTemplate>
      <ProjectNewContainer />
    </PageTemplate>
  );
};

export default NewProjectPage;
