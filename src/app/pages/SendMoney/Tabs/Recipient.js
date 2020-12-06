import React from "react";

const Recipient = (props) => {
  const onProceedNext = () => {
    props.onSetTabs(null, "tab4");
  };

  return (
    <div id="stepRecipient" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
      <h1>Where would you like to receive?</h1>
      <div className="card">
        <div className="card-body radioCustom accordion" id="accordionExample">
          <div className="form-control bb-0" style={{ pointerEvents: "none", opacity: 0.5 }}>
            <div className="custom-control custom-radio">
              <input type="radio" className="custom-control-input" name="payType" id="payType1" />
              <label className="custom-control-label" htmlFor="payType1">
                <div className="row">
                  <div className="col-md-12 col-xs-12">
                    <b>Share by Link</b> <br />
                    <span className="text-muted">Recipent will receive payment via link</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="text-center mb-4">
            <span className="divider text-muted">
              <span className="orTxt">OR</span>
            </span>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="input-group input-group-sm-down-break align-items-center customControl">
                <input
                  type="text"
                  className="js-masked-input form-control bdr-8"
                  name="phone"
                  id="searchBeneficiary"
                  placeholder="Search beneficiary"
                />

                <div className="input-group-append"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-control">
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="payType" id="payType2" defaultChecked />
                  <label className="custom-control-label" htmlFor="payType2">
                    <div className="row">
                      <div className="col-sm-12 mb-2 mb-sm-0">
                        <h4 className="mb-2">
                          <i className="fas fa-money-check"></i> Beneficiary Details
                        </h4>
                        <hr />
                        <div className="row">
                          <div className="col-md-6">
                            <span className="d-block text-dark strong">Country:</span>
                          </div>
                          <div className="col-md-6">
                            <span className="d-block text-dark">
                              <img src="assets/svg/flags/canada.svg" style={{ width: "15px" }} /> Canada
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <span className="d-block text-dark strong">Currency:</span>
                          </div>
                          <div className="col-md-6">
                            <span className="d-block text-dark">CAD</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <span className="d-block text-dark strong">Beneficiary Full Name:</span>
                          </div>
                          <div className="col-md-6">
                            <span className="d-block text-dark">Othman Mahmood </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <span className="d-block text-dark strong">Bank Name:</span>
                          </div>
                          <div className="col-md-6">
                            <span className="d-block text-dark">RBC Bank</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <span className="d-block text-dark strong">IBAN:</span>
                          </div>
                          <div className="col-md-6">
                            <span className="d-block text-dark">234298429829487234 </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex align-items-center">
            <button type="button" className="btn btn-ghost-secondary" onClick={() => props.onSetTabs(null, "tab1")}>
              <i className="tio-chevron-left"></i> Back
            </button>

            <div className="ml-auto">
              <button type="button" className="btn btn-primary" onClick={onProceedNext}>
                Continue <i className="tio-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipient;
