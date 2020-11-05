import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";

import AppLoader from "../../../components/AppLoader/AppLoader";
import Select2 from "../../../components/Select2/Select2";

import { callApi } from "../../../services/apiServices";
import ApiConstants from "../../../shared/config/apiConstants";
import AppConfig from "../../../shared/config/appConfig";

const UploadedDocument = (props) => {
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
  const [selectedDocumentType, setSelectedDocumentType] = useState(documents[0]);
  const [fileData, setFileData] = useState(null);

  const fetchDocuments = () => {
    setShowLoader(true);
    callApi("get", ApiConstants.FETCH_DOCUMENTS)
      .then((response) => {
        if (response.code === 200) {
          setUploadedDocument(response.data);
          setShowLoader(false);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
        });
        setShowLoader(false);
      });
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const documentStatus = uploadedDocument.map((document, index) => {
    return (
      <p key={index}>
        <i className={document.verified ? "fas fa-check-circle" : "fas fa-times"}></i>
        <a href={AppConfig.API_BASE_URL + ApiConstants.FETCH_DOCUMENT + document.id} target="_blank" style={{ color: "#009fff" }}>
          {document.documentTypes}
        </a>
      </p>
    );
  });

  const uploadDocuments = () => {
    let typeIndex = uploadedDocument.findIndex((item) => {
      console.log(
        "item.documentTypes.toLowerCase() === selectedDocumentType.toLowerCase()",
        item.documentTypes.toLowerCase(),
        selectedDocumentType.toLowerCase()
      );
      return item.documentTypes.toLowerCase() === selectedDocumentType.toLowerCase();
    });
    if (typeIndex > -1) {
      pushDocuments("patch", ApiConstants.UPDATE_DOCUMENT);
    } else {
      pushDocuments("post", ApiConstants.PUSH_DOCUMENT);
    }
  };

  const pushDocuments = (method, apiUrl) => {
    setShowLoader(true);
    const data = new FormData();
    data.append("file", fileData);
    data.append("type", selectedDocumentType);

    callApi(method, apiUrl, data, {
      "Content-Type": "multipart/form-data",
    })
      .then((response) => {
        if (response.code === 200) {
          toast.success(response.message, {
            position: "top-right",
          });
          setShowLoader(false);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
        });
        setShowLoader(false);
      });
  };

  const onDocumentTypeSelection = (event) => {
    setSelectedDocumentType(event.value);
  };

  return (
    <React.Fragment>
      <AppLoader show={showLoader} />
      <div id="uploadedDocument" className="card card-lg" style={{ display: `${props.active ? "block" : "none"}` }}>
        <div className="card-body">
          <h4>Upload Document</h4>
          <div className="form-group">
            <Select2
              options={documents}
              placeholder="Select"
              isSearchable={true}
              onChange={onDocumentTypeSelection}
              defaultValue={selectedDocumentType}
            />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <label className="custom-file-boxed" htmlFor="customFileInputBoxedEg">
                    <span id="customFileBoxedEg">Browse your device and upload documents</span>
                    <small className="d-block text-muted">Maximum file size 10MB</small>
                    <input
                      id="customFileInputBoxedEg"
                      className="js-file-attach custom-file-boxed-input"
                      name="custom-file-boxed"
                      type="file"
                      onChange={(event) => {
                        setFileData(event.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4>Uploaded Documents</h4>
            <div className="uploadedDoc">{documentStatus}</div>
          </div>
        </div>
        <div className="card-footer d-flex align-items-center">
          <div className="ml-auto">
            <button type="button" className="btn btn-primary" onClick={uploadDocuments}>
              Update
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(UploadedDocument);
