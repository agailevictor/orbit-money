import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import "./DataGrid.scss";

const DataGrid = (props) => {
  const { t, notifications } = props;

  return (
    <React.Fragment>
      {(
        <React.Fragment>
          <div className="card">
            <div className="data-grid-container">
              <table id="datatable" className="tblNotification table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle card-table"> 
                <tbody>  
                  {
                    notifications.map((n, i) => {
                      return (
                        <tr key={i}>
                          <td className="table-column-pr-0">
                              
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="usersDataCheck2" />
                              <label className="custom-control-label" htmlFor="usersDataCheck2"></label>
                            </div>
                          </td>
                          <td className="table-column-pl-0">
                            <div className="unRead"></div>
                            <a className="d-flex align-items-center" href="#">
                              <div className="avatar avatar-soft-primary avatar-circle">
                                <span className="avatar-initials">A</span>
                              </div>
                              <div className="ml-3">
                                <span className="d-block h5 text-hover-primary mb-0">{ n.title }</span>
                                <span className="d-block font-size-sm text-body">{ n.detail }</span>
                              </div>
                            </a>
                          </td>
                          
                          <td><span>05:00</span> | <span>15-Sep-2020</span></td>
                          <td></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
            
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.lookupsReducer.notifications,
});

export default connect(mapStateToProps)(withTranslation()(DataGrid));
