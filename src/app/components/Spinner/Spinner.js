import React from "react";
import ReactDOM from "react-dom";

import "./Spinner.scss";

const Spinner = (props) => {
  //   const gridContent = document && document.querySelector(".k-grid-content");

  return (
    <React.Fragment>
      <div className="k-loading-mask spinner-loader show">
        <div className="k-loading-image"></div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
