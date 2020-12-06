import React from "react";

const Pay = (props) => {
  return (
    <div id="stepPay" className={`step-card-pay card-lg ${props.active ? "active" : ""}`}>
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <img className="img-fluid mb-3" src="./assets/svg/illustrations/hi-five.svg" alt="Image Description" style={{ maxWidth: "10rem" }} />

            <div className="mb-4">
              <h2>
                Your transaction <br /> has successfully done
              </h2>
              <p>
                Please follow the instructions provided in <br /> your email address.
              </p>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <a className="btn btn-white" href="dashboard.html">
                Go To Dashbaord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
