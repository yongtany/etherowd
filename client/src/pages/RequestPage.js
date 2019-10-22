import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectContributeContainer from 'containers/project/ProjectContributeContainer';
import ProjectHeaderContainer from 'containers/project/ProjectHeaderContainer';
import ProjectWrapper from 'components/project/ProjectWrapper';
import ProjectContentContainer from 'containers/project/ProjectContentContainer';
import RequestListContainer from 'containers/request/RequestListContainer';

const RequestPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ProjectHeaderContainer
        id={id}
      />
      <ProjectWrapper>
        <RequestListContainer
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

export default RequestPage;
