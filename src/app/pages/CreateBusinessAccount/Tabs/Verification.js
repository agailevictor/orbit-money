import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import AppLoader from "../../../components/AppLoader/AppLoader";
import { toastService } from "../../../services/toastService";
import { callApi } from "../../../services/apiService";
import ApiConstants from "../../../shared/config/apiConstants";

import Select2 from "../../../components/Select2/Select2";

const Verification = (props) => {
  const { t } = props;
  const [documents, setDocuments] = useState([
    { label: "ID CARD FRONT", value: "ID_CARD_FRONT" },
    { label: "ID CARD BACK", value: "ID_CARD_BACK" },
    { label: "PASSPORT", value: "PASSPORT" },
    { label: "DRIVERS LICENSE FRONT", value: "DRIVERS_LICENSE_FRONT" },
    { label: "DRIVERS LICENSE BACK", value: "DRIVERS_LICENSE_BACK" },
    { label: "BANK CARD", value: "BANK_CARD" },
  ]);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [fileData, setFileData] = useState([]);
  const [activeUploadList, setActiveUploadList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const validationSchema = Yup.object().shape({
    docType: Yup.string().required(t("Settings.PersonalAccount.DocumentTypeRequiredValidationLabel")),
    custom_file_boxed: Yup.mixed()
      .required(t("Settings.PersonalAccount.FileRequiredValidationLabel"))
      .test("fileSize", t("Settings.PersonalAccount.FileSizeValidationLabel"), (value) => value && value.size <= 1000000) //in bytes , 10mb
      .test("fileType", t("Settings.PersonalAccount.FileTypeValidationLabel"), (value) => value && ["application/pdf"].includes(value.type)),
  });

  const onDocumentTypeSelection = (event) => {
    setSelectedDocumentType(event);
  };

  const selectedFilesList = fileData.map((file, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{file.type.label}</td>
        <td>
          { !file.uploadStatus &&  
            <button type="button" className="btn btn-info btn-xs" onClick={(e) => uploadDocument(file)}>
              Upload
            </button>
          }
         
        </td>
      </tr>
    );
  });

  const uploadDocument = (selectedFile) => {
    setShowLoader(true);
    getBase64(selectedFile.file, (result) => {
      const businessAccount = localStorage.getItem("selectedCustomerAccount") ?JSON.parse(localStorage.getItem("selectedCustomerAccount")) : null
      let params =  {
        base64: result,
        businessAccountId: businessAccount ? businessAccount.id : null,
        documentTypes: selectedFile.type.value,
        fileName: selectedFile.file.name,
      }
      callApi( "post", ApiConstants.PUSH_BUSINESS_DOCUMENT, params, true)
        .then((response) => {
          setShowLoader(false);
          if (response.code === 200) {
            toastService.success(response.message);
            let updatedData = fileData.map(file => {
              if(file.type.value === selectedFile.type.value) {
                return { ...file, uploadStatus: true}
              } else {
                return {...file}
              }
            })
            setFileData(updatedData)
            let updatedUploadList = updatedData.filter(file => file.uploadStatus === false)
            setActiveUploadList(updatedUploadList)
          } else {
            toastService.error(response.message);
          }
        })
        .catch((error) => {
          toastService.error(error.message);
          setShowLoader(false);
        });
    });
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result.split(",")[1]);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const onSelectFile = (event) => {
    let updatedFileData = fileData;
    let index = updatedFileData.findIndex(item => item.type === selectedDocumentType)
    if(index === -1) {
      updatedFileData.push({ file: event.target.files[0], type: selectedDocumentType, uploadStatus: false });
    } else {
      updatedFileData[index].file = event.target.files[0]
    }
    setFileData(updatedFileData.map((item) => item));
    let updatedUploadList = fileData.filter(file => file.uploadStatus === false)
    setActiveUploadList(updatedUploadList)
    
  }

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="stepVerification" className={`step-card card-lg ${props.active ? "active" : ""}`}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            docType: "",
            custom_file_boxed: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {}}>
          {({ errors, touched, handleChange }) => (
            <Form>
              <h1>Verification</h1>
              <div className="card">
                <div className="card-body">
                  <h4>Upload Document</h4>
                  <div className="form-group">
                    <Select2
                      options={documents}
                      className={errors.docType ? "is-invalid" : ""}
                      placeholder={t("Settings.PersonalAccount.Select")}
                      isSearchable={true}
                      onChange={(value) => {
                        onDocumentTypeSelection(value);
                        let event = { target: { name: "docType", value: value } };
                        handleChange(event);
                      }}
                      defaultValue={selectedDocumentType}
                      error={errors.docType}
                      touched={touched.docType}
                    />
                  </div>
                  <div className="form-group uploadDocument">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center">
                          <label
                            className={`custom-file-boxed ${errors.custom_file_boxed ? "custom-error-upload-container" : ""}`}
                            htmlFor="customFileInputBoxedEg">
                            <span id="customFileBoxedEg">{t("Settings.PersonalAccount.BrowseDocuments")}</span>
                            <small className="d-block text-muted">{t("Settings.PersonalAccount.MaximumFileSize")}</small>
                            <input
                              id="customFileInputBoxedEg"
                              className={`js-file-attach custom-file-boxed-input ${errors.custom_file_boxed ? "is-invalid" : ""}`}
                              name="custom_file_boxed"
                              type="file"
                              onChange={(event) => {
                                let eventData = { target: { name: "custom_file_boxed", value: event.target.files[0] } };
                                handleChange(eventData);
                                onSelectFile(event)
                              }}
                              onClick={(event) => {
                                event.target.value = null;
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="bg-gray">
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>{selectedFilesList}</tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-sm-flex align-items-sm-center">
                  <div className="ml-auto">
                    <Link to="/customer-dashboard">
                    <button id="" type="button" className="btn btn-primary" disabled={activeUploadList.length}>
                      Continue
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Verification);
