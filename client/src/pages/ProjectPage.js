import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectDetailContainer from 'containers/project/ProjectDetailContainer';

const ProjectPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ProjectDetailContainer
        id={id}
      />
    </PageTemplate>
  );
};

export default ProjectPage;
