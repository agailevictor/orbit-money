import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { withTranslation } from "react-i18next";
import moment, { now } from "moment";
import Select from "react-select";
import { toast } from "react-toastify";

import Spinner from "../../../components/Spinner/Spinner";
import { callApi, callDownloadApi } from "../../../services/apiServices";
import ApiConstants from "../../../shared/config/apiConstants";

import "bootstrap-daterangepicker/daterangepicker.css";
import "@progress/kendo-theme-default/dist/all.css";
import "./DataGrid.scss";

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

const DataGrid = (props) => {
  const { t } = props;

  const sortOptions = [
    {
      value: "ALL",
      label: t("Dashboard.All"),
    },
    {
      value: "SENT",
      label: t("Dashboard.Sent"),
    },
    {
      value: "RECEIVED",
      label: t("Dashboard.Received"),
    },
  ];
  const [totalRecords, setTotalRecords] = useState(0);
  const [gridLoader, setgridLoader] = useState(false);
  const [gridData, setgridData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [pageable, setPageable] = useState({
    buttonCount: 5,
    info: true,
    type: "numeric",
    pageSizes: [5, 10, 25, 50],
    previousNext: true,
  });
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const [totalSelected, settotalSelected] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [fromDate, setFromDate] = useState(moment(now()).format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(fromDate);

  const fetchTransaction = (currentPage, pageSize, selectedSortOption, fromDateValue, toDateValue, searchText) => {
    setgridLoader(true);
    callApi("post", ApiConstants.FETCH_TRANSACTIONS, {
      page: currentPage,
      pageSize: pageSize,
      sortBy: selectedSortOption,
      text: searchText,
      fromDate: fromDateValue,
      toDate: toDateValue,
    })
      .then((response) => {
        if (response.code === 200) {
          setTotalRecords(response.data.totalRecords);
          let gridDataArray = response.data.records.map((dataItem) => Object.assign({ selected: false }, dataItem));
          setgridData(gridDataArray);
          setTotalSelectedCount(gridDataArray);
          setgridLoader(false);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
        });
        setgridLoader(false);
      });
  };

  const exportAsPdf = (currentPage, pageSize, selectedSortOption, fromDateValue, toDateValue, searchText) => {
    let params = {
      fromDate: fromDateValue,
      toDate: toDateValue,
      page: currentPage,
      pageSize: pageSize,
      sortBy: selectedSortOption,
      text: searchText,
    };
    const filename = "transactions_" + fromDateValue + "_" + toDateValue + ".pdf";
    callDownloadApi("post", ApiConstants.EXPORT_AS_PDF, params, null, filename).catch((error) => {
      toast.error(error.message, {
        position: "top-right",
      });
    });
  };

  useEffect(() => {
    fetchTransaction(1, take, sortOption, fromDate, toDate, searchData);
  }, [props.transactions]);

  const headerSelectionChange = (event) => {
    const checked = event.syntheticEvent.target.checked;
    const data = gridData.map((item) => {
      item.selected = checked;
      return item;
    });
    setgridData(data);
    setTotalSelectedCount();
  };

  const setTotalSelectedCount = (data = gridData) => {
    const selectedCount = data.filter((item) => item.selected).length;
    settotalSelected(selectedCount);
  };

  const selectionChange = (event) => {
    const data = gridData.map((item) => {
      if (item.id === event.dataItem.id) {
        item.selected = !event.dataItem.selected;
      }
      return item;
    });
    setgridData(data);
    setTotalSelectedCount();
  };

  const renderType = (dataItem) => {
    let typeIcon = "";
    switch (dataItem.type) {
      case "SENT":
        typeIcon = <img src="assets/svg/dashboard/bank-send.svg" />;
        break;
      case "RECEIVED":
        typeIcon = <img src="assets/svg/dashboard/bank-receive.svg" />;
        break;
      case "PENDING":
        typeIcon = <img src="assets/svg/dashboard/bank-waiting.svg" />;
        break;
      case "CONVERSATION":
        typeIcon = <img src="assets/svg/dashboard/conversion-fee.svg" />;
        break;
      case "EXCHANGE":
        typeIcon = <img src="assets/svg/dashboard/exchange.svg" />;
        break;
    }
    return typeIcon;
  };

  const pageChange = (event) => {
    let skipValue = event.page.skip;
    let takeValue = event.page.take;
    setSkip(skipValue);
    setTake(takeValue);
    setPageable({
      buttonCount: 5,
      info: true,
      type: "numeric",
      pageSizes: [5, 10, 25, 50],
      previousNext: true,
    });
    fetchTransaction(Math.floor(skipValue / takeValue) + 1, takeValue, sortOption, fromDate, toDate, searchData);
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <div className="row justify-content-between align-items-center flex-grow-1">
            <div className="col-12 col-md">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-header-title">{t("Dashboard.Transactions")}</h5>
              </div>
            </div>

            <div className="col-auto">
              <div className="row align-items-sm-center">
                <div className="col-sm-auto">
                  <div className="d-flex align-items-center mr-2">
                    <span className="mr-2">
                      <DateRangePicker
                        onApply={(event, picker) => {
                          const fromDateValue = moment(picker.startDate).format("YYYY-MM-DD");
                          const toDateValue = moment(picker.toDate).format("YYYY-MM-DD");
                          setFromDate(fromDateValue);
                          setToDate(toDateValue);
                          fetchTransaction(Math.floor(skip / take) + 1, take, sortOption, fromDateValue, toDateValue, searchData);
                        }}>
                        <input placeholder="Select Date Range" type="text" className="form-control" />
                      </DateRangePicker>
                    </span>

                    <span className="text-secondary mr-2">{t("Dashboard.SortBy")}</span>

                    <Select
                      options={sortOptions}
                      defaultValue={sortOptions[0]}
                      placeholder="Select"
                      isSearchable={false}
                      styles={customStyles}
                      onChange={(value) => {
                        setSortOption(value.value);
                        fetchTransaction(Math.floor(skip / take) + 1, take, value.value, fromDate, toDate, searchData);
                      }}
                    />
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
                      <input
                        id="datatableSearch"
                        type="search"
                        className="form-control"
                        placeholder={t("Dashboard.SearchUsers")}
                        aria-label="Search users"
                        onChange={(event) => {
                          setSearchData(event.target.value);
                          fetchTransaction(Math.floor(skip / take) + 1, take, sortOption, fromDate, toDate, event.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data-grid-container">
          {gridData.length && gridLoader && <Spinner />}
          <Grid
            style={{ minWidth: "1100px" }}
            data={[...gridData]}
            selectedField="selected"
            onSelectionChange={selectionChange}
            onHeaderSelectionChange={headerSelectionChange}
            pageable={pageable}
            skip={skip}
            pageSize={take}
            total={totalRecords}
            onPageChange={pageChange}>
            <Column
              field="selected"
              width="50px"
              headerSelectionValue={gridData && gridData.findIndex((dataItem) => dataItem.selected === false) === -1}
            />
            <Column
              field="type"
              title="Type"
              width="250px"
              headerCell={(HeaderCellProps) => (
                <div id="datatableCounterInfo">
                  <div className="align-items-center">
                    <span className="font-size-sm mr-3">
                      <span id="datatableCounter">{totalSelected} </span>
                      {t("Dashboard.Selected")}
                    </span>
                  </div>
                </div>
              )}
              cell={(props) => {
                return (
                  <td>
                    <div>
                      <a className="d-flex align-items-center" href="#">
                        <div className="avatar-soft-primary avatar-circle sent-avatar">
                          <span className="avatar-initials">{renderType(props.dataItem)}</span>
                        </div>
                        <div className="ml-3">
                          <span className="d-block h5 text-hover-primary mb-0">{props.dataItem.title}</span>
                          <span className="d-block font-size-sm text-body type-text">{props.dataItem.type.toLowerCase()}</span>
                        </div>
                      </a>
                    </div>
                  </td>
                );
              }}
            />
            <Column
              field="transactionId"
              title="Transaction ID"
              headerCell={(HeaderCellProps) => <span></span>}
              cell={(props) => {
                return (
                  <td>
                    <strong className="text-dark">{t("Dashboard.TransactionID")}</strong> <br /> <span>{props.dataItem.reference}</span>
                  </td>
                );
              }}
            />
            <Column
              field="iban"
              title="From"
              headerCell={(HeaderCellProps) => <span></span>}
              cell={(props) => {
                return (
                  <td>
                    <strong className="text-dark">{t("Dashboard.From")}</strong>
                    <br /> <span>{props.dataItem.iban}</span>
                  </td>
                );
              }}
            />
            <Column
              field="amount"
              title="Amount"
              headerCell={(HeaderCellProps) => <span></span>}
              cell={(props) => {
                return (
                  <td>
                    <span
                      className={`d-block h5 mb-0 strong ${
                        props.dataItem.type === "SENT" ? "text-danger" : props.dataItem.type === "RECEIVED" ? "text-success" : ""
                      }`}>
                      {props.dataItem.amount} {props.dataItem.currency}
                    </span>
                    <span className="d-block font-size-sm">
                      <span>{props.dataItem.time} </span> | <span>{props.dataItem.date}</span>
                    </span>
                  </td>
                );
              }}
            />
            <Column
              field="action"
              title="Action"
              headerCell={(HeaderCellProps) => {
                return (
                  <a
                    className="btn btn-sm btn-outline-danger float-right"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      exportAsPdf(Math.floor(skip / take) + 1, take, sortOption, fromDate, toDate, searchData);
                    }}>
                    <i className="far fa-file-pdf"></i> {t("Dashboard.TransactionsasPDF")}
                  </a>
                );
              }}
              cell={(props) => {
                return (
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn btn-white"
                      data-toggle="tooltip"
                      data-html="true"
                      title={t("Dashboard.DownloadTransactions")}>
                      <i className="tio-download-to dropdown-item-icon"></i>
                    </button>
                  </td>
                );
              }}
            />
          </Grid>
        </div>
        <div className="card-footer" style={{ padding: "5px" }}></div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(DataGrid);
