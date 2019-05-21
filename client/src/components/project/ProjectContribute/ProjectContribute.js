import React from 'react';

const ProjectContribute = props => (
      <div className="new-wrapper">
        <form onSubmit={props.onSubmit} error={props.errorMessage}>
          <div className="form-group">
            <label className="pr-4"><b>투자 금액</b></label>
            <input
              placeholder="Ether"
              value={props.value}
              name="value"
              onChange={props.onChange}
            />
          </div>
          {
            props.loading ?
              <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
            : <button className="btn btn-primary mb-5">투자하기</button>
          }
        </form>
      </div>
)

export default ProjectContribute;
