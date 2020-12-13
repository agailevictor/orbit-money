import React from "react";
import { withTranslation } from "react-i18next";


import DataGrid from "./DataGrid/DataGrid"

function Notifications(props){

    return (
      <React.Fragment>

      <div className="content container-fluid">
        
        <div className="page-header">
          <div className="row align-items-end">
            <div className="col-sm mb-2 mb-sm-0">
              <div className="row">
                <div className="col-md-9">
                   <h1 className="page-title">Notifications</h1>
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

export default withTranslation()(Notifications);
