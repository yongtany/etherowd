import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectContributeContainer from 'containers/project/ProjectContributeContainer';
import ProjectHeaderContainer from 'containers/project/ProjectHeaderContainer';
import ProjectWrapper from 'components/project/ProjectWrapper';
import ProjectContentContainer from 'containers/project/ProjectContentContainer';
import ProjectRankingContainer from 'containers/project/ProjectRankingContainer';

const ProjectRankingPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ProjectHeaderContainer
        id={id}
      />
      <ProjectWrapper>
        <ProjectRankingContainer
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

export default ProjectRankingPage;
