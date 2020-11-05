import React from "react";
import { withTranslation } from "react-i18next";

import Select2 from "../../../components/Select2/Select2";
import CountryList from "../../../components/CountryList/CountryList";

const countryOptions = [
  {
    value: "USA",
    label: "USA",
    icon: "us",
  },
  {
    value: "CAN",
    label: "CAN",
    icon: "ca",
  },
  {
    value: "AUS",
    label: "AUS",
    icon: "au",
  },
];

const cityOptions = [
  {
    value: "New york",
    label: "New york",
  },
  {
    value: "Chicago",
    label: "Chicago",
  },
  {
    value: "Boston",
    label: "Boston",
  },
  {
    value: "Los Angeles",
    label: "Los Angeles",
  },
];

const provinceOptions = [
  {
    value: "California",
    label: "California",
  },
  {
    value: "Texas",
    label: "Texas",
  },
  {
    value: "Florida",
    label: "Florida",
  },
  {
    value: "Washington",
    label: "Washington",
  },
];

const PersonalDetails = (props) => {
  return (
    <React.Fragment>
      <div id="PersonalDetails" className="card card-lg active" style={{ display: `${props.active ? "block" : "none"}` }}>
        <div className="card-body">
          <div className="row form-group">
            <div className="col-sm-12 text-center">
              <div className="d-block align-items-center">
                <label className="avatar avatar-xl avatar-circle avatar-uploader mr-5" htmlFor="avatarUploader">
                  <img id="avatarImg" className="avatar-img" src="./assets/img/160x160/img1.jpg" />
                  <input type="file" className="js-file-attach avatar-uploader-input" id="avatarUploader" />
                  <span className="avatar-uploader-trigger">
                    <i className="tio-edit avatar-uploader-icon shadow-soft"></i>
                  </span>
                </label>
              </div>
              <div className="verifiedLabel">
                <b>
                  <i className="fas fa-check-circle"></i> Verified
                </b>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <input type="text" className="form-control" name="" id="" placeholder="First Name" />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" name="" id="" placeholder="Middle Name" />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" name="" id="" placeholder="Last Name" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-md-12">
                <input type="text" className="form-control" name="" id="" placeholder="Address" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <CountryList options={countryOptions} isSearchable={true} onChange={(value) => console.log(value)} />
              </div>
              <div className="col-md-4">
                <Select2 options={cityOptions} placeholder="City" isSearchable={true} onChange={(value) => console.log(value)} />
              </div>
              <div className="col-md-4">
                <Select2 options={provinceOptions} placeholder="Province" isSearchable={true} onChange={(value) => console.log(value)} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Are you a political exposed person(PEP)?</label>
            <div className="input-group input-group-sm-down-break">
              <div className="form-control radioBlock">
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="quesO" id="quesO1" />
                  <label className="custom-control-label" htmlFor="quesO1">
                    Yes
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="quesO" defaultChecked id="quesO2" />
                  <label className="custom-control-label" htmlFor="quesO2">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Are you directly related to a political exposed person(PED)?</label>
            <div className="input-group input-group-sm-down-break">
              <div className="form-control radioBlock">
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="quesT" id="quesT1" />
                  <label className="custom-control-label" htmlFor="quesT1">
                    Yes
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input" name="quesT" defaultChecked id="quesT2" />
                  <label className="custom-control-label" htmlFor="quesT2">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end align-items-center">
          <button type="button" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(PersonalDetails);
