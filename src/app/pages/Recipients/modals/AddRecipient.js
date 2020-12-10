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
import AppLoader from "../../../components/AppLoader/AppLoader";

let addRecipientSchema = null;

class AddRecipient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoader: false,
            countryOptions: [],
            stateOptions: [],
            cityOptions: [],
            purposeOfPaymentOptions: [],
            recipientRequiredFields: [],
            currenciesOptions: [],
            banksOptions: [],
        };


        const { t } = this.props;

        addRecipientSchema = this.getValidationObject();
    }

    componentDidMount() {
        this.fetchCountries();
        this.fetchCurrencies();
    }

    fetchStatesByCountry(countryId) {
        this.setState({ showLoader: true });
        callApi("get", ApiConstants.FETCH_PROVINCES + "?countryId=" + countryId)
            .then((response) => {
                console.log(response);
                if (response.code === 200) {
                    let states = response.dataList.map(function (state) {
                        return {
                            value: state.id,
                            label: state.title,
                            url: state.url
                        };
                    });
                    this.setState({ showLoader: false, stateOptions: states });
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                });
                this.setState({ showLoader: false });
            });
    }

    fetchCitiesByCountry(countryId) {
        this.setState({ showLoader: true });
        callApi("get", ApiConstants.FETCH_CITIES_BY_COUNTRY + "?countryId=" + countryId)
            .then((response) => {
                if (response.code === 200) {
                    let cities = response.dataList.map(function (city) {
                        return {
                            value: city.id,
                            label: city.title
                        };
                    });
                    this.setState({ showLoader: false, cityOptions: cities });
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                });
                this.setState({ showLoader: false });
            });
    }

    fetchPurposeOfPaymentsByCountry(countryId) {
        this.setState({ showLoader: true });
        callApi("post", ApiConstants.GET_PURPOSE_LIST, { countryId: countryId })
            .then((response) => {
                if (response.code === 200) {
                    let purposeOfPayments = response.dataList.map(function (purposeOfPayment) {
                        return {
                            value: purposeOfPayment.Code,
                            label: purposeOfPayment.Description
                        };
                    });
                    this.setState({ showLoader: false, purposeOfPaymentOptions: purposeOfPayments });
                }


            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                });
                this.setState({ showLoader: false });
            });
    }

    fetchCountries() {
        this.setState({ showLoader: true });
        callApi("get", ApiConstants.FETCH_COUNTRIES)
            .then((response) => {
                if (response.code === 200) {
                    let countries = response.dataList.map(function (country) {
                        return {
                            value: country.id,
                            label: country.title,
                            icon: country.url
                        };
                    });
                    this.setState({ showLoader: false, countryOptions: countries });
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                });
                this.setState({ showLoader: false });
            });
    }

    fetchCurrencies() {
        this.setState({ showLoader: true });
        callApi("get", ApiConstants.FETCH_CURRENCY_LIST)
            .then((response) => {
                if (response.code === 200) {

                    let currencies = response.dataList.map(function (currency) {
                        return {
                            value: currency.id,
                            label: currency.code,
                            icon: currency.country.url
                        };
                    });

                    this.setState({ showLoader: false, currenciesOptions: currencies });
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-right",
                });
                this.setState({ showLoader: false });
            });
    }

    getValidationObject() {

        const { t } = this.props;

        let validationObject = {
            countryId: Yup.number().min(1, t("Recipients.AddRecipient.CountryRequiredValidationLabel")).required(t("Recipients.AddRecipient.CountryRequiredValidationLabel")),
            cityId: Yup.number().min(1, t("Recipients.AddRecipient.CityRequiredValidationLabel")).required(t("Recipients.AddRecipient.CityRequiredValidationLabel")),
            currencyId: Yup.number().min(1, t("Recipients.AddRecipient.CurrencyRequiredValidationLabel")).required(t("Recipients.AddRecipient.CurrencyRequiredValidationLabel")),
            fullName: Yup.string().required(t("Recipients.AddRecipient.RecipientNameRequiredValidationLabel")),
            bankAccountNumber: Yup.string().required(t("Recipients.AddRecipient.BankNumberRequiredValidationLabel")),
            bankName: Yup.string().required(t("Recipients.AddRecipient.BankNameRequiredValidationLabel")),
            receiptAddressLine1: Yup.string().required(t("Recipients.AddRecipient.ReceiptAddressLine1RequiredValidationLabel")),
            bankSWIFTBIC: Yup.string().required(t("Recipients.AddRecipient.BankSWIFTBICRequiredValidationLabel"))
        };

        if (this.isFieldRequired("purposeOfPaymentCode")) {
            validationObject.purposeOfPaymentCode = Yup.string().required(t("Recipients.AddRecipient.PurposeOfPaymentRequiredValidationLabel"));
        }

        if (this.isFieldRequired("receiptPostalCode")) {
            validationObject.receiptPostalCode = Yup.string().required(t("Recipients.AddRecipient.ReceiptPostalCodeRequiredValidationLabel"));
        }

        if (this.isFieldRequired("receiptRegionId")) {
            validationObject.receiptRegionId = Yup.string().required(t("Recipients.AddRecipient.ReceiptRegionIdRequiredValidationLabel"));
        }


        return Yup.object().shape(validationObject);
    }

    closePopup = (event) => {
        event.preventDefault();
        this.props.handleClosePopup();
    }

    updateRecipientList = (recipient) => {
        this.props.handleRecipientListOnSuccess(recipient);
    }

    onCountryChange = (setFormFieldValue, country) => {
        setFormFieldValue('countryId', country.value);
        this.fetchCitiesByCountry(country.value);
        this.fetchPurposeOfPaymentsByCountry(country.value);
        this.fetchStatesByCountry(country.value);

        // reset values
        this.setState({ recipientRequiredFields: [] });
        setFormFieldValue('cityId', 0);
        setFormFieldValue('receiptRegionId', 0);
        setFormFieldValue('purposeOfPaymentCode', 0);
        setFormFieldValue('receiptPostalCode', '');


    }

    onCityChange = (setFormFieldValue, city) => {
        setFormFieldValue('cityId', city.value)
    }

    isFieldRequired(fieldValue) {
        return (this.state.recipientRequiredFields.filter((field) => field.includes(fieldValue)).length > 0)
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
                    size="lg"
                    centered
                >
                    <AppLoader show={this.state.showLoader} />
                    <Modal.Header closeButton>
                        <Modal.Title>{t("Recipients.AddRecipient.AddNewRecipientModal")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                "countryId": 0,
                                "cityId": 0,
                                "currencyId": 0,
                                "fullName": "",
                                "bankAccountNumber": "",
                                "bankName": "",
                                "bankSWIFTBIC": "",
                                "receiptAddressLine1": ""
                            }}
                            validationSchema={addRecipientSchema}
                            onSubmit={async (values) => {

                                let recipient = {
                                    "countryId": values.countryId,
                                    "cityId": values.cityId,
                                    "currencyId": values.currencyId,
                                    "fullName": values.fullName,
                                    "bankAccountNumber": values.bankAccountNumber,
                                    "bankName": values.bankName,
                                    "bankSWIFTBIC": values.bankSWIFTBIC,
                                    "receiptAddressLine1": values.receiptAddressLine1
                                };

                                if (this.isFieldRequired("purposeOfPaymentCode")) {
                                    recipient.purposeOfPaymentCode = values.purposeOfPaymentCode;
                                }

                                if (this.isFieldRequired("receiptPostalCode")) {
                                    recipient.receiptPostalCode = values.receiptPostalCode;
                                }

                                if (this.isFieldRequired("receiptRegionId")) {
                                    recipient.receiptRegionId = values.receiptRegionId;
                                }


                                this.setState({ showLoader: true });
                                callApi("post", ApiConstants.ADD_RECIPIENTS, recipient)
                                    .then((response) => {
                                        console.log(response);
                                        if (response.code === 200) {

                                            toast.success(response.message, {
                                                position: "top-right",
                                            });

                                            this.setState({ showLoader: false });


                                            this.props.handleClosePopup();
                                            this.updateRecipientList(response);

                                        }

                                        if (response.code === 400) {
                                            if (response.dataList) {
                                                this.setState({ recipientRequiredFields: response.dataList });
                                            }
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

                            }}>
                            {({ errors, setFieldValue, }) => (

                                <FormikForm>

                                    <div className="row">
                                        <div className="col-sm-12 tabBankDetail">

                                            <div className="form-group">
                                                <ul className="benDetail">
                                                    <li>
                                                        <div className={`form-group ${errors.countryId ? "is-invalid" : ""}`}>
                                                            <CountryList name="countryId"
                                                                options={this.state.countryOptions}
                                                                placeholder={t("Recipients.AddRecipient.FieldLabelCountry")}
                                                                isSearchable={true}
                                                                className="form-control"
                                                                onChange={(country) => { elem.onCountryChange(setFieldValue, country) }} />

                                                            <ErrorMessage name="countryId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                        </div>
                                                    </li>
                                                    <li>

                                                        <div className={`form-group ${errors.currencyId ? "is-invalid" : ""}`}>
                                                            <Select2 name="currencyId"
                                                                className="form-control"
                                                                options={this.state.currenciesOptions}
                                                                placeholder={t("Recipients.AddRecipient.FieldLabelCurrency")}
                                                                isSearchable={true}
                                                                onChange={(currency) => setFieldValue('currencyId', currency.value)} />
                                                        </div>
                                                        <ErrorMessage name="currencyId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>

                                                    </li>
                                                </ul>
                                            </div>
                                            <fieldset>
                                                <legend>Bank Details</legend>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-6">

                                                            <div className="form-group">
                                                                <FormikField
                                                                    type="text"
                                                                    className={`form-control ${errors.bankName ? "is-invalid" : ""}`}
                                                                    name="bankName"
                                                                    id="bankName"
                                                                    placeholder={t("Recipients.AddRecipient.FieldLabelRecipientBankName")}
                                                                />
                                                                <ErrorMessage name="bankName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <FormikField
                                                                    type="text"
                                                                    className={`form-control ${errors.bankAccountNumber ? "is-invalid" : ""}`}
                                                                    name="bankAccountNumber"
                                                                    id="bankAccountNumber"
                                                                    placeholder={t("Recipients.AddRecipient.FieldLabelBankAccountNumber")}
                                                                />
                                                                <ErrorMessage name="bankAccountNumber">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <FormikField
                                                                    type="text"
                                                                    className={`form-control ${errors.bankSWIFTBIC ? "is-invalid" : ""}`}
                                                                    name="bankSWIFTBIC"
                                                                    id="bankSWIFTBIC"
                                                                    placeholder={t("Recipients.AddRecipient.FieldLabelBankSWIFTBIC")}
                                                                />
                                                                <ErrorMessage name="bankSWIFTBIC">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="mt-3">
                                                <legend>Beneficiary Details</legend>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <FormikField
                                                                    type="text"
                                                                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                                                                    name="fullName"
                                                                    id="fullName"
                                                                    placeholder={t("Recipients.AddRecipient.FieldLabelRecipientFullName")}
                                                                />
                                                                <ErrorMessage name="fullName">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        </div>

                                                        {this.isFieldRequired("receiptRegionId") &&
                                                            <div className="col-md-6">

                                                                <div className={`form-group ${errors.receiptRegionId ? "is-invalid" : ""}`}>
                                                                    <Select2 name="cityId"
                                                                        className="form-control"
                                                                        options={this.state.stateOptions}
                                                                        placeholder={t("Recipients.AddRecipient.FieldLabelRegion")}
                                                                        isSearchable={true}
                                                                        onChange={(region) => setFieldValue('receiptRegionId', region.value)} />
                                                                </div>

                                                                <ErrorMessage name="receiptRegionId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        }

                                                        <div className="col-md-6">

                                                            <div className={`form-group ${errors.cityId ? "is-invalid" : ""}`}>
                                                                <Select2 name="cityId"
                                                                    className="form-control"
                                                                    options={this.state.cityOptions}
                                                                    placeholder={t("Recipients.AddRecipient.FieldLabelCity")}
                                                                    isSearchable={true}
                                                                    onChange={(city) => setFieldValue('cityId', city.value)} />
                                                            </div>

                                                            <ErrorMessage name="cityId">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                        </div>

                                                        {this.isFieldRequired("receiptPostalCode") &&
                                                            <div className="col-md-6">
                                                                <div className={`form-group ${errors.receiptPostalCode ? "is-invalid" : ""}`}>
                                                                    <FormikField
                                                                        type="text"
                                                                        className={`form-control ${errors.receiptPostalCode ? "is-invalid" : ""}`}
                                                                        name="receiptPostalCode"
                                                                        id="receiptPostalCode"
                                                                        placeholder={t("Recipients.AddRecipient.FieldLabelReceiptPostalCode")}
                                                                    />
                                                                </div>

                                                                <ErrorMessage name="receiptPostalCode">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <FormikField
                                                        type="text"
                                                        className={`form-control ${errors.receiptAddressLine1 ? "is-invalid" : ""}`}
                                                        name="receiptAddressLine1"
                                                        id="receiptAddressLine1"
                                                        placeholder={t("Recipients.AddRecipient.FieldLabelReceiptAddressLine1")}
                                                    />
                                                    <ErrorMessage name="receiptAddressLine1">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                </div>

                                            </fieldset>


                                            {this.state.recipientRequiredFields.length > 0 &&
                                                <fieldset className="mt-3">
                                                    <legend>Other Details</legend>
                                                    <div className="form-group">
                                                        <div className="row">
                                                            {this.isFieldRequired("purposeOfPaymentCode") &&
                                                                <div className="col-md-6">

                                                                    <div className={`form-group ${errors.purposeOfPaymentCode ? "is-invalid" : ""}`}>
                                                                        <Select2 name="purposeOfPaymentCode"
                                                                            className="form-control"
                                                                            options={this.state.purposeOfPaymentOptions}
                                                                            placeholder={t("Recipients.AddRecipient.FieldLabelPurposeOfPayment")}
                                                                            isSearchable={true}
                                                                            onChange={(purposeOfPayment) => setFieldValue('purposeOfPaymentCode', purposeOfPayment.value)} />
                                                                    </div>
                                                                    <ErrorMessage name="purposeOfPaymentCode">{(msg) => <div className="invalid-feedback">{msg}</div>}</ErrorMessage>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            }

                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <Button variant="white"
                                            type={"button"}
                                            className={"mr-2"}
                                            onClick={this.closePopup}
                                        >
                                            {t('General.Button.Cancel')}
                                        </Button>
                                        <Button variant="primary"
                                            type={"submit"}
                                        >
                                            {t('General.Button.Save')}
                                        </Button>

                                    </div>
                                </FormikForm>
                            )}
                        </Formik>

                    </Modal.Body>
                </Modal>

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    userToken: state.userReducer.userToken,
});

export default connect(mapStateToProps)(withTranslation()(AddRecipient));