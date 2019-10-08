import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectListContainer from 'containers/project/ProjectListContainer';

const ListPage = ({ match }) => {
  const { page =1, tag } = match.params;
  return (
    <PageTemplate>
      <ProjectListContainer
        page={parseInt(page, 10)}
        tag={tag}
      />
    </PageTemplate>
  );
};

export default ListPage;
