import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ProjectContributeContainer from 'containers/project/ProjectContributeContainer';
import ProjectHeaderContainer from 'containers/project/ProjectHeaderContainer';
import ProjectWrapper from 'components/project/ProjectWrapper';
import ProjectBodyContainer from 'containers/project/ProjectBodyContainer';
import ProjectContentContainer from 'containers/project/ProjectContentContainer';

const ProjectStoryPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ProjectHeaderContainer
        id={id}
      />
      <ProjectWrapper>
        <ProjectBodyContainer
          id={id}
        />
        <ProjectContentContainer
          id={id}
        />
      </ProjectWrapper>
      <ProjectContributeContainer
        address={id}
      />
    </PageTemplate>
  );
};

export default ProjectStoryPage;
