import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProjectListContainer from 'containers/project/ProjectListContainer';

const ListPage = () => {
  return (
    <PageTemplate>
      <ProjectListContainer />
    </PageTemplate>
  );
};

export default ListPage;
