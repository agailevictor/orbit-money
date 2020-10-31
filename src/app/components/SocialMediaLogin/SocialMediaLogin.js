import React from "react";

const SocialMediaLogin = (props) => {
  return (
    <React.Fragment>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <a className="btn btn-lg btn-white btn-block f-13" href="#">
              <span className="d-flex justify-content-center align-items-center">
                <img className="avatar avatar-xss mr-2" src="./assets/svg/brands/google.svg" alt="Login with google" />
                Login with Google
              </span>
            </a>
          </div>
          <div className="col-md-6">
            <a className="btn btn-lg btn-white btn-block f-13" href="#">
              <span className="d-flex justify-content-center align-items-center">
                <img className="avatar avatar-xss mr-2" src="./assets/svg/brands/facebook.svg" alt="Login with facebook" />
                Login with facebook
              </span>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SocialMediaLogin;
