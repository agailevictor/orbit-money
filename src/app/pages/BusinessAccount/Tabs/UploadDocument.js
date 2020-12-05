import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import AppLoader from "../../../components/AppLoader/AppLoader";
import Select2 from "../../../components/Select2/Select2";

import { callApi } from "../../../services/apiService";
import { toastService } from "../../../services/toastService";

import ApiConstants from "../../../shared/config/apiConstants";
import AppConfig from "../../../shared/config/appConfig";

const UploadedDocument = (props) => {
  const { t } = props;
  const [documents, setDocuments] = useState([
    { label: "ID CARD FRONT", value: "ID_CARD_FRONT" },
    { label: "ID CARD BACK", value: "ID_CARD_BACK" },
    { label: "PASSPORT", value: "PASSPORT" },
    { label: "DRIVERS LICENSE FRONT", value: "DRIVERS_LICENSE_FRONT" },
    { label: "DRIVERS LICENSE BACK", value: "DRIVERS_LICENSE_BACK" },
    { label: "BANK CARD", value: "BANK_CARD" },
  ]);

  const [uploadedDocument, setUploadedDocument] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [fileData, setFileData] = useState(null);
  const validationSchema = Yup.object().shape({
    docType: Yup.string().required(t("Settings.BusinessAccount.DocumentTypeRequiredValidationLabel")),
    custom_file_boxed: Yup.mixed()
      .required(t("Settings.BusinessAccount.FileRequiredValidationLabel"))
      .test("fileSize", t("Settings.BusinessAccount.FileSizeValidationLabel"), (value) => value && value.size <= 1000000) //in bytes , 10mb
      .test("fileType", t("Settings.BusinessAccount.FileTypeValidationLabel"), (value) => value && ["application/pdf"].includes(value.type)),
  });

  const fetchDocuments = () => {
    setShowLoader(true);
    callApi("get", ApiConstants.FETCH_DOCUMENTS, null, true)
      .then((response) => {
        if (response.code === 200) {
          setUploadedDocument(response.dataList);
          setShowLoader(false);
        } else {
          setShowLoader(false);
          toastService.error(response.message, {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toastService.error(error.message, {
          position: "top-right",
        });
        setShowLoader(false);
      });
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const documentStatus = uploadedDocument.map((document, index) => {
    let selectedItem = documents.find((item) => item.value === document.documentTypes);
    if (selectedItem) {
      return (
        <p key={index}>
          <i className={document.verified ? "fas fa-check-circle" : "fas fa-times"}></i>
          <a href={AppConfig.API_BASE_URL + ApiConstants.FETCH_DOCUMENT + document.id} target="_blank" style={{ color: "#009fff" }}>
            {selectedItem.label}
          </a>
        </p>
      );
    }
  });

  const uploadDocuments = () => {
    setShowLoader(true);
    getBase64(fileData, (result) => {
      callApi(
        "post",
        ApiConstants.PUSH_BUSINESS_DOCUMENT,
        {
          base64: result,
          businessAccountId: JSON.parse(localStorage.getItem("selectedCustomerAccount")).id,
          documentTypes: selectedDocumentType,
          fileName: fileData.name,
        },
        true
      )
        .then((response) => {
          setShowLoader(false);
          if (response.code === 200) {
            toastService.success(response.message, {
              position: "top-right",
            });
            fetchDocuments();
          } else {
            toastService.error(response.message, {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
          toastService.error(error.message, {
            position: "top-right",
          });
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

  const onDocumentTypeSelection = (event) => {
    setSelectedDocumentType(event.value);
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />{" "}
      <Formik
        initialValues={{
          docType: "",
          custom_file_boxed: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          uploadDocuments();
        }}>
        {({ errors, touched, handleChange }) => (
          <Form>
            <div id="uploadedDocument" className="card card-lg" style={{ display: `${props.active ? "block" : "none"}` }}>
              <div className="card-body">
                <h4>{t("Settings.BusinessAccount.UploadDocument")}</h4>
                <div className="form-group">
                  <Select2
                    options={documents}
                    className={errors.docType ? "is-invalid" : ""}
                    placeholder="Select"
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
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex align-items-center">
                        <label
                          className={`custom-file-boxed ${errors.custom_file_boxed ? "custom-error-upload-container" : ""}`}
                          htmlFor="customFileInputBoxedEg">
                          <span id="customFileBoxedEg">{t("Settings.BusinessAccount.BrowseDocuments")}</span>
                          <small className="d-block text-muted">{t("Settings.BusinessAccount.MaximumFileSize")}</small>
                          <input
                            id="customFileInputBoxedEg"
                            className={`js-file-attach custom-file-boxed-input ${errors.custom_file_boxed ? "is-invalid" : ""}`}
                            name="custom_file_boxed"
                            type="file"
                            onChange={(event) => {
                              setFileData(event.target.files[0]);
                              let eventData = { target: { name: "custom_file_boxed", value: event.target.files[0] } };
                              handleChange(eventData);
                            }}
                          />
                        </label>
                      </div>
                      {errors.custom_file_boxed && touched.custom_file_boxed && (
                        <div className="invalid-feedback custom-error-container">{errors.custom_file_boxed}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h4>{t("Settings.BusinessAccount.UploadedDocuments")}</h4>
                  <div className="uploadedDoc">{documentStatus}</div>
                </div>
              </div>
              <div className="card-footer d-flex align-items-center">
                <div className="ml-auto">
                  <button type="submit" className="btn btn-primary">
                    {t("Settings.Update")}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default withTranslation()(UploadedDocument);
