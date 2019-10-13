import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import RequestListContinaer from 'containers/request/RequestListContainer';

const RequestPage = ({ match }) => {
  const { id } = match.params;

  return (
    <PageTemplate>
      <RequestListContinaer
        id={id}
      />

    </PageTemplate>
  );
};

export default RequestPage;
