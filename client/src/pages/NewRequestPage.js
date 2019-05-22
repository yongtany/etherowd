import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import RequestNewContainer from 'containers/request/RequestNewContainer';

const NewRequestPage = ({ match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <RequestNewContainer
        id={id}
      />
    </PageTemplate>
  );
};

export default NewRequestPage;
