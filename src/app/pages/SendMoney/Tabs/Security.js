import React from "react";

const Security = (props) => {
  return (
    <div id="stepSecurity" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
      <h1>Recipient details and security</h1>
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label>
              <b>Recipient Details</b>
            </label>
            <span className="redColor">*</span>
            <input type="text" className="form-control" name="" id="" placeholder="Name" />
          </div>
          <div className="form-group">
            <label>
              <b>Create a question with a secret answer as the password</b>
            </label>
            <span className="redColor">*</span>
            <select className="form-control js-select2-custom select2-hidden-accessible">
              <option defaultValue>Select Question</option>
              <option>What is your first school?</option>
              <option>What is your favorite color?</option>
              <option>Enter your pin code of your choice.</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="" id="" placeholder="Select answer as password" />
          </div>
          <div className="form-group">
            <label>
              <b>Reference/Purpose to sending money</b>
            </label>
            <span className="redColor">*</span>
            <input type="text" className="form-control" name="" id="" placeholder="Reference/Purpose to sending money" />
          </div>
        </div>
        <div className="card-footer d-sm-flex align-items-sm-center">
          <button type="button" className="btn btn-ghost-secondary">
            <i className="tio-chevron-left"></i> Back
          </button>

          <div className="ml-auto">
            <button type="button" className="btn btn-primary">
              Continue <i className="tio-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
