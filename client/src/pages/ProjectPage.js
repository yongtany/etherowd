import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectDetailContainer from 'containers/project/ProjectDetailContainer';
import ProjectContributeContainer from '../containers/project/ProjectContributeContainer';

const ProjectPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ProjectDetailContainer
        id={id}
      />
      <ProjectContributeContainer
        address={id}
      />
    </PageTemplate>
  );
};

export default ProjectPage;
