import React from 'react';

const ProjectContribute = props => (

<div className="modal fade" id="fundingTarget" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLongTitle">
        투자하기
      </h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
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
    </div>
    <div className="modal-footer">
    </div>
  </div>
</div>
</div>
)

export default ProjectContribute;
