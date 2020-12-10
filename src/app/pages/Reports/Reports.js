import React from "react";
import CountUp from "react-countup";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { callApi } from "../../services/apiServices";
import ApiConstants from "../../shared/config/apiConstants";

import AppLoader from "../../components/AppLoader/AppLoader";
import CurrencyList from "../../components/CurrencyList/CurrencyList";
import DataGrid from "./DataGrid/DataGrid";
import "./Reports.scss";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      currency: "",
      imgFlag: "",
      showLoader: true,
    };
  }

  componentDidMount() {
    
  }

  render() {
    const { t } = this.props;
    
    const options = [
      { value: "England", label: "England", icon: "ad" },
      { value: "Germany", label: "Germany", icon: "ae" }
    ];

    return (
      <React.Fragment>

      <div className="content container-fluid">
        
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <div className="row">
                <div className="col-md-9">
                   <h1 className="page-title">Reports</h1>
                </div>
                <div className="col-md-3">
                  <div className="form-group">

                      <CurrencyList 
                        options={options}
                        isSearchable="true" />
                      
                    </div>
                </div>
              </div>             
            </div> 
          </div>
        </div>

        <DataGrid />

      </div>
         
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
});

export default connect(mapStateToProps)(withTranslation()(Reports));
