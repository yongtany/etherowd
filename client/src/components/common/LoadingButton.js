import React from 'react';

const LoadingButton = prop => (
  <button className={`btn btn-${prop.type}`} type="button" disabled>
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    로딩중...
  </button>
);

export default LoadingButton;
