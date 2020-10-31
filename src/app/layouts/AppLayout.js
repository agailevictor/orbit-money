import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import Language from "../components/Language/Language";

const AppLayout = (props) => {
  useLayoutEffect(() => {
    let e = document.getElementsByTagName("body")[0];
    e.className = "d-flex align-items-center min-h-100";
  }, []);

  return (
    <React.Fragment>
      <header className="position-absolute top-0 left-0 right-0 mt-3 mx-3">
        <div className="d-flex d-lg-none justify-content-between">
          <Link to="/dashboard">
            <img className="w-100" src="./assets/svg/logos/logo.svg" alt="Image Description" style={{ minWidth: "7rem", maxWidth: "7rem" }} />
          </Link>

          <div id="languageSelect2" className="select2-custom select2-custom-right z-index-2">
            <Language width="160px" />
          </div>
        </div>
      </header>
      <main id="content" role="main" className="main pt-0">
        <div className="container-fluid px-3">{props.children}</div>
      </main>
    </React.Fragment>
  );
};

export default AppLayout;
