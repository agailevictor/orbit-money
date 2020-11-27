import React from "react";
import { withTranslation } from "react-i18next";
import Spinner from "../../components/Spinner/Spinner";
import queryString from "query-string";

import { callApi } from "../../services/apiService";
import { toastService } from "../../services/toastService";

import ApiConstants from "../../shared/config/apiConstants";

import "./Verify.scss";

class Verify extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let params = queryString.parse(this.props.location.search);
    const { token, source, internal, key } = params;

    callApi("post", ApiConstants.ACTIVATE_USER, {
      internal: internal,
      key: key,
      source: source,
      token: token,
    })
      .then((response) => {
        if (response.code == 200) toastService.success("You have successfully verified your Email. Please sign in to Orbit Money", 10000);
        else toastService.error(response.message);
        this.props.history.push("/signin");
      })
      .catch((error) => {
        toastService.error(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="content container-fluid">
          <Spinner />
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(Verify);
