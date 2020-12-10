import React, { useState, useEffect } from 'react';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';
import { toastService } from "../../services/toastService";

function Account(props){
    const { account, t } = props;
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(account.dcbankCustomerStatus == "ACTIVE")
            setShow(true);
        else
            toastService.error(`"${account.accountName}" ${t("AddMoney.Direct_Debit.accout_not_active")}: ${account.dcbankCustomerStatus}`);
            
    };

    return (
            <>
              <div className="form-control bb-0 acountaded mt-3" onClick={handleShow}>
                    <label className="d-block" htmlFor="payType1">
                        <div className="row">
                        <div className="col-md-12 col-xs-12 pointer" data-toggle="modal" data-target="#addNewCard"> 
                            <span>
                                <span><b>{account.firstName +" "+account.lastName}</b> <br/> {account.accountName}</span>  
                                <span className="float-right pr-2">{account.accountNumber}</span>
                            </span>
                        </div> 
                        </div>
                    </label>
                </div>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header>
                        <h4 id="" className="modal-title">{ t("AddMoney.Direct_Debit.amount_to_transfer") }</h4>
                        <button onClick={handleClose} type="button" className="btn btn-icon btn-sm btn-ghost-secondary">
                            <i className="tio-clear tio-lg"></i>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row justify-content-lg-center"> 
                            <div className="col-md-12 p-3"> 
                                <div className="form-group">  
                                <label className="text-dark"><b>{ t("AddMoney.Direct_Debit.enter_amount") }</b></label>
                                <input type="text" className="form-control" name="" id="" placeholder="10,000" aria-label="10,000"/> 
                                </div> 
                            </div>  
                        </div>
                        <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-primary">{ t("AddMoney.Direct_Debit.send_money") }</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
}

const mapStateToProps = (state) => ({
    userToken: state.userReducer.userToken,
  });
  
  export default connect(mapStateToProps)(withTranslation()(Account));