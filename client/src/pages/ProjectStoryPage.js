import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectStoryContainer from 'containers/project/ProjectStoryContainer';
// import ProjectContributeContainer from '../containers/project/ProjectContributeContainer';

const ProjectStoryPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ProjectStoryContainer
        id={id}
      />
      {/* <ProjectContributeContainer
        address={id}
      /> */}
    </PageTemplate>
  );
};

export default ProjectStoryPage;
