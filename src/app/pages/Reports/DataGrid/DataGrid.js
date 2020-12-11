import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { withTranslation } from "react-i18next";
import moment, { now } from "moment";
import ReactTooltip from "react-tooltip";

import Spinner from "../../../components/Spinner/Spinner";
import Select2 from "../../../components/Select2/Select2";
import { callApi, callDownloadApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";
import ApiConstants from "../../../shared/config/apiConstants";
import GridPager from "./GridPager";
import { Nav } from 'react-bootstrap';

import "./DataGrid.scss";

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
  const [key, setKey] = useState('all-transactions');

  const [totalRecords, setTotalRecords] = useState(0);
  const [gridLoader, setgridLoader] = useState(false);
  const [emptyTransactionList, setEmptyTransactionList] = useState(true);
  const [gridData, setgridData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const [totalSelected, settotalSelected] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [fromDate, setFromDate] = useState(moment(now()).format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(fromDate);
  const [selectedIds, setSelectedIds] = useState([]);

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
          if (response.data.totalRecords > 0) {
            setEmptyTransactionList(false);
          }
          setTotalRecords(response.data.totalRecords);
          let gridDataArray = response.data.records.map((dataItem) => Object.assign({ selected: false }, dataItem));
          setgridData(gridDataArray);
          setTotalSelectedCount(gridDataArray);
          setgridLoader(false);
        }
      })
      .catch((error) => {
        toastService.error(error.message);
        setgridLoader(false);
      });
  };

  const exportAsPdf = (currentPage, fromDateValue, paramsValue) => {
    let params = {
      ids: paramsValue,
    };
    const filename = "transactions_" + currentPage + "_" + fromDateValue + ".pdf";
    callDownloadApi("post", ApiConstants.EXPORT_AS_PDF, params, filename, false).catch((error) => {
      toastService.error(error.message);
    });
  };

  useEffect(() => {
    fetchTransaction(1, take, sortOption, fromDate, toDate, searchData);
  }, [props.transactions]);

  const headerSelectionChange = (event) => {
    const checked = event.syntheticEvent.target.checked;
    let transactionIds = [];
    const data = gridData.map((item) => {
      item.selected = checked;
      checked && transactionIds.push(item.reference);
      return item;
    });
    setgridData(data);
    setSelectedIds(transactionIds);
    setTotalSelectedCount();
  };

  const setTotalSelectedCount = (data = gridData) => {
    const selectedCount = data.filter((item) => item.selected).length;
    settotalSelected(selectedCount);
  };

  const selectionChange = (event) => {
    let transactionIds = selectedIds;
    const data = gridData.map((item) => {
      if (item.id === event.dataItem.id) {
        item.selected = !event.dataItem.selected;
        let index = selectedIds.findIndex((id) => id === item.reference);
        if (index > -1) {
          transactionIds = selectedIds.filter((id) => id !== item.reference);
        } else {
          transactionIds.push(item.reference);
        }
      }
      return item;
    });
    setgridData(data);
    setSelectedIds(transactionIds);
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
    fetchTransaction(Math.floor(skipValue / takeValue) + 1, takeValue, sortOption, fromDate, toDate, searchData);
  };

  return (
    <React.Fragment>
      {!emptyTransactionList && (
        <React.Fragment>
          <div className="row">
            <div className="col-md-6">
              <h4>{t("Dashboard.LatestTransactions")}</h4>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="row justify-content-between align-items-center flex-grow-1">
                <div className="col-12 col-md">
                  <div className="d-flex justify-content-between align-items-center">
                    <Nav variant="pills"
                      activeKey={key}
                      className="reportsTabs"
                      onSelect={(k) => {
                        setKey(k);
                        setSortOption(k);
                        fetchTransaction(Math.floor(skip / take) + 1, take, k, fromDate, toDate, searchData);
                      }}>
                      <Nav.Item>
                        <Nav.Link eventKey="all-transactions">{t("Reports.AllTransactions")}</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="outgoing-transactions">{t("Reports.OutgoingTransactions")}</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="incoming-transactions">{t("Reports.IncomingTransactions")}</Nav.Link>
                      </Nav.Item>
                    </Nav>
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

                        <Select2
                          options={sortOptions}
                          defaultValue={sortOptions[0]}
                          placeholder="Select"
                          isSearchable={false}
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
              {gridData.length > 0 && gridLoader && <Spinner />}
              <Grid
                style={{ minWidth: "880px" }}
                data={[...gridData]}
                selectedField="selected"
                onSelectionChange={selectionChange}
                onHeaderSelectionChange={headerSelectionChange}>
                <Column
                  field="selected"
                  width="60px"
                  headerSelectionValue={gridData && gridData.findIndex((dataItem) => dataItem.selected === false) === -1}
                />
                <Column
                  field="type"
                  title="Type"
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
                          className={`d-block h5 mb-0 strong ${props.dataItem.type === "SENT" ? "text-danger" : props.dataItem.type === "RECEIVED" ? "text-success" : ""
                            }`}>
                          {parseFloat(props.dataItem.amount).toFixed(2)} {props.dataItem.currency}
                        </span>
                        <span className="d-block font-size-sm">
                          <span>{props.dataItem.time} </span> | <span>{moment(props.dataItem.date).format("DD-MMM YYYY")}</span>
                        </span>
                      </td>
                    );
                  }}
                />
                <Column
                  field="action"
                  title="Action"
                  width="150px"
                  headerCell={(HeaderCellProps) => {
                    return (
                      <a
                        className="btn btn-sm btn-outline-danger float-right download-all"
                        href="#"
                        style={selectedIds.length > 0 ? {} : { pointerEvents: "none", opacity: "0.3" }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (selectedIds.length > 0) {
                            exportAsPdf(Math.floor(skip / take) + 1, fromDate, selectedIds);
                          } else {
                            return false;
                          }
                        }}>
                        <i className="far fa-file-pdf"></i> {t("Dashboard.TransactionsasPDF")}
                      </a>
                    );
                  }}
                  cell={(props) => {
                    return (
                      <td style={{ textAlign: "center" }}>
                        <ReactTooltip />
                        <button
                          type="button"
                          className="btn btn-white"
                          data-tip={t("Dashboard.DownloadTransactions")}
                          onClick={(e) => {
                            e.preventDefault();
                            exportAsPdf(Math.floor(skip / take) + 1, fromDate, [props.dataItem.reference]);
                          }}>
                          <i className="tio-download-to dropdown-item-icon"></i>
                        </button>
                      </td>
                    );
                  }}
                />
              </Grid>
            </div>
            <div className="card-footer">
              <GridPager onPageChange={pageChange} total={totalRecords} skip={skip} take={take} />
            </div>
          </div>
        </React.Fragment>
      )}
      {emptyTransactionList && !gridLoader && (
        <div className="row">
          <div className="col-md-12 text-center mt-9">
            <img src="assets/svg/addmoney/add-card.svg" />
            <h2 className="mt-5">{t("Dashboard.NoTransaction")}</h2>
            <p>{t("Dashboard.SendOrAddMoneytoWallet")}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withTranslation()(DataGrid);
