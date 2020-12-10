import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { callApi } from "../../../services/apiService";
import ApiConstants from "../../../shared/config/apiConstants";
import * as Yup from "yup";
import { ErrorMessage, Field as FormikField, Form as FormikForm, Formik } from "formik";
import CountryList from "../../../components/CountryList/CountryList";
import Select2 from "../../../components/Select2/Select2";
import { toast } from "react-toastify";

class DeleteRecipient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoader: false
        };

        const { t } = this.props;
    }

    componentDidMount() {
    }

    closePopup = (event) => {
        event.preventDefault();
        this.props.handleClosePopup();
    }

    deleteRecipient = (event) => {
        event.preventDefault();
        this.props.handleDeleteRecipient();
    }

    render() {
        const { t } = this.props;
        const elem = this;

        return (
            <React.Fragment>
                <Modal
                    show={this.props.handleShowPopup}
                    onHide={this.props.handleClosePopup}
                    backdrop="static"
                    keyboard={false}
                    size="md"
                    centered
                >
                    <Modal.Body>

                        <div className="modal-body text-center mt-4">
                            <p><b>Are you sure you want to <br /> delete this record</b></p>
                            <br />
                            <Button variant="white"
                                type={"button"}
                                className={"mr-2"}
                                onClick={this.closePopup}
                            >
                                {t('General.Button.Cancel')}
                            </Button>
                            <Button variant="primary"
                                type={"button"}
                                className={"mr-2"}
                                onClick={this.deleteRecipient}
                            >
                                {t('General.Button.Delete')}
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    userToken: state.userReducer.userToken,
});

export default connect(mapStateToProps)(withTranslation()(DeleteRecipient));