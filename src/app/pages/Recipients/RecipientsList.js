import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Recipient from "./Recipient";
import { connect } from "react-redux";
import { callApi } from "../../services/apiService";
import ApiConstants from "../../shared/config/apiConstants";
import { toast } from "react-toastify";
import AddRecipient from "./modals/AddRecipient";
import EditRecipient from "./modals/EditRecipient";
import DeleteRecipient from "./modals/DeleteRecipient";
import { Button } from "react-bootstrap";
import AppLoader from "../../components/AppLoader/AppLoader";

class RecipientsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipients: [],
      recipientsToDisplay: [],
      recipientToDelete: [],
      recipientToUpdate: [],
      showLoader: true,
      showAddPopup: false,
      showEditPopup: false,
      showDeletePopup: false
    };
  }

  componentDidMount() {
    this.fetchRecipents();
  }

  fetchRecipents() {
    this.setState({ showLoader: true });

    callApi("get", ApiConstants.GET_BENEFICIARY_LIST)
      .then((response) => {
        if (response.code === 200) {
          this.setState({ showLoader: false, recipients: response.dataList });
          this.setState({ recipientsToDisplay: [...this.state.recipients] });
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
        });
        this.setState({ showLoader: false });
      });
  }

  showAddRecipientPopup = event => {
    this.setState({ showAddPopup: true });
  };

  filterOnSearch = event => {
    if (
      !event.target.value ||
      event.target.value === " " ||
      event.target.value === ""
    )
      this.setState({ recipientsToDisplay: [...this.state.recipients] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.recipients.filter(
        item => {
          if ((item.bankName != undefined && item.bankName
            .toLowerCase().toString()
            .includes(event.target.value.toLowerCase().toString())) ||
            (item.fullName != undefined && item.fullName
              .toLowerCase().toString()
              .includes(event.target.value.toLowerCase().toString())) ||
            (item.iban != undefined && item.iban.toLowerCase().toString()
              .includes(event.target.value.toLowerCase().toString()))
          ) {
            return item;

          }
        }

      );
      this.setState({ recipientsToDisplay: itemsToDisplay });
    }
  };

  closeAddRecipientPopup() {
    this.setState({ showAddPopup: false });
  };

  closeEditRecipientPopup() {
    this.setState({ showEditPopup: false });
  };

  updateRecipientListOnSuccess = (recipient) => {
    console.log(recipient);
  };

  updateRecipientListOnUpdateSuccess = (recipient) => {
    console.log(recipient);
  };

  showEditModal = (recipient) => {
    this.setState({ showEditPopup: true, recipientToUpdate: recipient });
  }

  showDeletePopup = (recipient) => {
    this.setState({ showDeletePopup: true, recipientToDelete: recipient })
  }

  closeDeleteRecipientPopup = () => {
    this.setState({ showDeletePopup: false, recipientToDelete: [] })
    console.log("closeDeleteRecipientPopup")
  };

  deleteRecipient = () => {

    callApi("delete", ApiConstants.RECIPIENTS_DELETE, { id: this.state.recipientToDelete.id })
      .then((response) => {
        if (response.code === 200) {

          toast.success(response.message, {
            position: "top-right",
          });

          this.setState({ showLoader: false });


          var recipients = [...this.state.recipientsToDisplay]; // make a separate copy of the array
          var index = recipients.indexOf(this.state.recipientToDelete)
          if (index !== -1) {
            recipients.splice(index, 1);
            this.setState({ recipientsToDisplay: recipients });
          }

          this.closeDeleteRecipientPopup();

        }

        if (response.code === 400) {
          toast.error(response.message, {
            position: "top-right",
          });
        }

        this.setState({ showLoader: false });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
        });
        this.setState({ showLoader: false });
      });
  };

  render() {
    const { t } = this.props;
    const elem = this;

    let recipientsList = this.state.recipientsToDisplay.map((recipient) => {
      return (
        <Recipient key={recipient.id}
          recipient={recipient}
          handleShowEditModal={elem.showEditModal}
          handleConfirmationDeleteModal={elem.showDeletePopup}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="content container-fluid dashboard-cdontainer">
          <AppLoader show={this.state.showLoader} />
          {this.state.showAddPopup &&
            <AddRecipient
              handleShowPopup={this.state.showAddPopup}
              handleClosePopup={() => this.closeAddRecipientPopup()}
              handleRecipientListOnSuccess={this.updateRecipientListOnSuccess}
            />
          }

          {this.state.showEditPopup &&
            <EditRecipient
              recipient={this.state.recipientToUpdate}
              handleShowPopup={this.state.showEditPopup}
              handleClosePopup={() => this.closeEditRecipientPopup()}
              handleRecipientListOnSuccess={this.updateRecipientListOnUpdateSuccess}
            />
          }

          {this.state.recipientToDelete &&
            <DeleteRecipient
              recipient={this.state.recipientToDelete}
              handleShowPopup={this.state.showDeletePopup}
              handleClosePopup={() => this.closeDeleteRecipientPopup()}
              handleDeleteRecipient={this.deleteRecipient}
            />
          }

          <div className="page-header">
            <div className="row align-items-end">
              <div className="col-sm mb-2 mb-sm-0">
                <div className="row">
                  <div className="col-md-6">
                    <h1 className="page-title">
                      {t("Recipients.RecipientsHeading")}
                      <Button as={"button"}
                        variant={"outline-primary"}
                        size={"sm"}
                        className={"ml-5"}
                        onClick={this.showAddRecipientPopup}
                      >
                        <i className="tio-add"></i>
                        {t("Recipients.Buttons.AddRecipients")}
                      </Button>

                    </h1>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group input-group-sm-down-break align-items-center customControl">
                      <input type="text" name="search_recipients"
                        id="search-recipients"
                        className="js-masked-input form-control bdr-8"
                        placeholder="Search" aria-label="Search"
                        onChange={this.filterOnSearch} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="recipientsBlock mt-4">
            <div className="row">

              {recipientsList}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userReducer.userToken,
});

export default connect(mapStateToProps)(withTranslation()(RecipientsList));
