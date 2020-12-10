import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import { Button } from "react-bootstrap";
import {withTranslation} from "react-i18next";

class Recipient extends Component {

    constructor(props) {
        super(props);
        const { t } = this.props;

    }

    showEditModal = (event) => {
        event.preventDefault();
        this.props.handleShowEditModal(this.props.recipient);
    };

    showConfirmationDeleteModal = (event) => {
        event.preventDefault();
        this.props.handleConfirmationDeleteModal(this.props.recipient);
    }

    render() {

        return (
            <React.Fragment>
                <div className="col-md-6">
                    <div className="media bgWarning"> 
                        <div className="media-body">
                            <div className="row">
                                <div className="col-sm mb-2 mb-sm-0">
                                    <h4 className="mb-2"><i className="fas fa-money-check"></i> Beneficiary Details</h4>
                                    <hr/>
                                    <div className="row addedAccount">
                                        <div className="col-md-12">
                                            <div className="py-0">
                                                <div className="row">
                                                    <div className="col-sm-12 mb-2 mb-sm-0">
                                                        <div className="form-group mb-0">
                                                            <ul className="benDetail">
                                                                <li><label>Country:</label> <span>{ this.props.recipient.city }</span></li>
                                                                <li><label>Currency:</label> <span>{ this.props.recipient.currency }</span></li> 
                                                            </ul>
                                                        </div>
                                                        <fieldset>
                                                            <legend>Bank Details</legend> 
                                                            <p className="mb-0"><b>Name:</b> { this.props.recipient.bankName }</p>
                                                            <p className="mb-0"><b>Code:</b> { this.props.recipient.bankName }</p> 
                                                            <p className="mb-0"><b>Account Number:</b> { this.props.recipient.bankAccountNumber }</p>  
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-sm-12 mb-2 mb-sm-0 mt-3">
                                                        <fieldset>
                                                            <legend>Beneficiary Details</legend>
                                                            <p className="mb-0"><b>Name:</b> { this.props.recipient.fullName }</p>
                                                            <p className="mb-0"><b>City:</b> { this.props.recipient.city }</p> 
                                                            <p className="mb-0"><b>Address:</b> { this.props.recipient.receiptAddressLine1 }</p>
                                                        </fieldset>  
                                                    </div> 
                                                </div> 
                                            </div>
                                        </div> 
                                    </div>
                                </div> 
                                <div className="col-sm-auto btnEditDelete">
                                    <div className="d-flex justify-content-sm-end">
                                        

                                        <Button as={"button"}
                                            variant={"outline-white"}
                                            size={"sm"}
                                            className={"ml-2 mr-1"}
                                            onClick={ this.showEditModal }
                                        >
                                            <i className="tio-edit"></i>
                                        </Button>

                                        <Button as={"button"}
                                            variant={"outline-primary"}
                                            size={"sm"}
                                            className={"ml-5 mr-1"}
                                            onClick={ this.showConfirmationDeleteModal }
                                        >
                                            <i className="tio-delete-outlined"></i>
                                        </Button>
                                    </div> 
                                </div>
                            </div>
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

export default connect(mapStateToProps)(withTranslation()(Recipient));