import React from "react";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";

import "bootstrap-daterangepicker/daterangepicker.css";

const Table = () => {
  const sortOptions = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Sent",
      label: "Sent",
    },
    {
      value: "Received",
      label: "Received",
    },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "110px",
      background: "transparent",
      border: "none",
      outline: "none",
      boxShadow: "none",
    }),
  };

  const pageOptions = [
    {
      value: "10",
      label: "10",
    },
    {
      value: "15",
      label: "15",
    },
    {
      value: "20",
      label: "20",
    },
  ];

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <div className="row justify-content-between align-items-center flex-grow-1">
            <div className="col-12 col-md">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-header-title">Transcations</h5>
              </div>
            </div>

            <div className="col-auto">
              <div className="row align-items-sm-center">
                <div className="col-sm-auto">
                  <div className="d-flex align-items-center mr-2">
                    <span className="mr-2">
                      <DateRangePicker>
                        <input placeholder="Select Date Range" type="text" className="form-control" />
                      </DateRangePicker>
                    </span>

                    <span className="text-secondary mr-2">Sort By:</span>

                    <Select options={sortOptions} defaultValue={sortOptions[0]} placeholder="Select" isSearchable={false} styles={customStyles} />
                  </div>
                </div>

                <div className="col-md">
                  <form>
                    <div className="input-group input-group-merge input-group-flush">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="tio-search"></i>
                        </div>
                      </div>
                      <input id="datatableSearch" type="search" className="form-control" placeholder="Search users" aria-label="Search users" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive datatable-custom dashboardGrid">
          <table id="datatable" className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
            <thead className="thead-light">
              <tr>
                <th scope="col" className="table-column-pr-0">
                  <div className="custom-control custom-checkbox mtn-10">
                    <input id="datatableCheckAll" type="checkbox" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="datatableCheckAll"></label>
                  </div>
                </th>
                <th colspan="5">
                  <div id="datatableCounterInfo">
                    <div className="align-items-center">
                      <span className="font-size-sm mr-3 mt10">
                        <span id="datatableCounter">0</span>
                        Selected
                      </span>
                      <a className="btn btn-sm btn-outline-danger float-right" href="javascript:;">
                        <i className="far fa-file-pdf"></i> Transactions as PDF
                      </a>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-column-pr-0">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="usersDataCheck2" />
                    <label className="custom-control-label" htmlFor="usersDataCheck2"></label>
                  </div>
                </td>
                <td className="table-column-pr-0">
                  <a className="d-flex align-items-center" href="#">
                    <div className="avatar-soft-primary avatar-circle sent-avatar">
                      <span className="avatar-initials">
                        <i className="fas fa-arrow-up"></i>
                      </span>
                    </div>
                    <div className="ml-3">
                      <span className="d-block h5 text-hover-primary mb-0">John M.Deo</span>
                      <span className="d-block font-size-sm text-body">Sent</span>
                    </div>
                  </a>
                </td>
                <td>
                  <strong className="text-dark">Transaction ID:</strong> <br /> <span>02145879314</span>
                </td>
                <td>
                  <strong className="text-dark">From:</strong>
                  <br /> <span>IBANONUMBER0000</span>
                </td>
                <td>
                  <span className="d-block h5 mb-0 text-danger strong">-10,000.00 EUR</span>
                  <span className="d-block font-size-sm">
                    <span>05:00 </span> | <span>15-Sep 2020</span>
                  </span>
                </td>
                <td>
                  <button type="button" className="btn btn-white" data-toggle="tooltip" data-html="true" title="Download Transactions">
                    <i className="tio-download-to dropdown-item-icon"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="table-column-pr-0">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="usersDataCheck3" />
                    <label className="custom-control-label" htmlFor="usersDataCheck3"></label>
                  </div>
                </td>
                <td className="table-column-pr-0">
                  <a className="d-flex align-items-center" href="#">
                    <div className="avatar-soft-primary avatar-circle receive-avatar">
                      <span className="avatar-initials">
                        <i className="fas fa-arrow-down"></i>
                      </span>
                    </div>
                    <div className="ml-3">
                      <span className="d-block h5 text-hover-primary mb-0">John M.Deo</span>
                      <span className="d-block font-size-sm text-body">Sent</span>
                    </div>
                  </a>
                </td>
                <td>
                  <strong className="text-dark">Transaction ID:</strong> <br /> <span>02145879314</span>
                </td>
                <td>
                  <strong className="text-dark">From:</strong>
                  <br /> <span>IBANONUMBER0000</span>
                </td>
                <td>
                  <span className="d-block h5 mb-0 text-danger strong">-10,000.00 EUR</span>
                  <span className="d-block font-size-sm">
                    <span>05:00 </span> | <span>15-Sep 2020</span>
                  </span>
                </td>
                <td>
                  <button type="button" className="btn btn-white" data-toggle="tooltip" data-html="true" title="Download Transactions">
                    <i className="tio-download-to dropdown-item-icon"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
            <div className="col-sm mb-2 mb-sm-0">
              <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
                <span className="mr-2">Showing:</span>
                <Select options={pageOptions} defaultValue={pageOptions[0]} placeholder="Select" isSearchable={false} styles={customStyles} />
                <span className="text-secondary mr-2">of</span> <span>120</span>
                <span id="datatableWithPaginationInfoTotalQty"></span>
              </div>
            </div>

            <div className="col-sm-auto">
              <div className="d-flex justify-content-center justify-content-sm-end">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Table;
