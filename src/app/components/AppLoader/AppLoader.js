import React from "react";

import "./AppLoader.scss";

const AppLoader = (props) => {
  return (
    <React.Fragment>
      <div className={`loader-container ${props.show ? "show-loader" : ""}`}>
        <img src="/assets/img/preloader.gif" className="loader-img" />
      </div>
    </React.Fragment>
  );
};
export default AppLoader;
