import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { toastService } from "../../../services/toastService";
import { callApi, callDownloadApi } from "../../../services/apiService";
import ApiConstants from "../../../shared/config/apiConstants";
import AppConfig from "../../../shared/config/appConfig";
import FileUploader from "../../../components/FileUploader/FileUploader"

const UploadedDocument = (props) => {
  const { t } = props;
  const [showLoader, setShowLoader] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState({
    ID_CARD_FRONT: false,
    ID_CARD_BACK: false,
    PASSPORT: false,
    DRIVERS_LICENSE_FRONT: false,
    DRIVERS_LICENSE_BACK: false,
    BANK_CARD: false
  });

  const fetchDocuments = () => {
    setShowLoader(true);
    callApi("get", ApiConstants.FETCH_DOCUMENTS)
      .then((response) => {
        if (response.code === 200) {
          let documents = Object.assign({}, uploadedDocument);
          response.dataList.forEach((doc) => {
            documents[doc.documentTypes] = doc;
          });
          setUploadedDocument(documents);
          setShowLoader(false);
        } else {
          setShowLoader(false);
          toastService.error(response.message, {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toastService.error(error.message);
        setShowLoader(false);
      });
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <React.Fragment>
      <div className="row mt-3 card-document">
        <div className="col-md-4 mt-3">
          <FileUploader
            method="post"
            onEnd={(r) => {
              if (r.code === 200) {
                toastService.success(r.message);
              } else {
                toastService.error(r.message);
              }
            }}
            doc={uploadedDocument.ID_CARD_FRONT}
            type="ID_CARD_FRONT"
            label="ID Card Front" />

        </div>
        <div className="col-md-4 mt-3">
          <FileUploader
            method="post"
            onEnd={(r) => {
              if (r.code === 200) {
                toastService.success(r.message);
              } else {
                toastService.error(r.message);
              }
            }}
            doc={uploadedDocument.ID_CARD_BACK}
            type="ID_CARD_BACK"
            label="ID Card Bank" />
        </div>
        <div className="col-md-4 mt-3">
          <FileUploader
            method="post"
            onEnd={(r) => {
              if (r.code === 200) {
                toastService.success(r.message);
              } else {
                toastService.error(r.message);
              }
            }}
            doc={uploadedDocument.PASSPORT}
            type="PASSPORT"
            label="Passport" />
        </div>
        <div className="col-md-4 mt-3">
          <FileUploader
            method="post"
            onEnd={(r) => {
              if (r.code === 200) {
                toastService.success(r.message);
              } else {
                toastService.error(r.message);
              }
            }}
            doc={uploadedDocument.DRIVERS_LICENSE_FRONT}
            type="DRIVERS_LICENSE_FRONT"
            label="Drivers License Front" />
        </div>
        <div className="col-md-4 mt-3">
          <FileUploader
            method="post"
            onEnd={(r) => {
              if (r.code === 200) {
                toastService.success(r.message);
              } else {
                toastService.error(r.message);
              }
            }}
            doc={uploadedDocument.DRIVERS_LICENSE_BACK}
            type="DRIVERS_LICENSE_BACK"
            label="Drivers License Back" />
        </div>
        <div className="col-md-4 mt-3">
          <FileUploader
            method="post"
            onEnd={(r) => {
              if (r.code === 200) {
                toastService.success(r.message);
              } else {
                toastService.error(r.message);
              }
            }}
            doc={uploadedDocument.BANK_CARD}
            type="BANK_CARD"
            label="Bank Card" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(UploadedDocument);
