import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { callApi, callDownloadApi } from "../../services/apiServices";
import ApiConstants from "../../shared/config/apiConstants";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import AppLoader from "../AppLoader/AppLoader";
import { toastService } from "../../services/toastService";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);

class FileUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [],
      uploader: false
      //loader: false
    };
  }

  pushDocument(base64, filename) {
    //this.setState({loader: true});
    if(this.props.onStart)
      this.props.onStart();
    
      callApi(this.props.method, ApiConstants.PUSH_DOCUMENT, {
        "base64": base64,
        "documentTypes": this.props.type,
        "fileName": filename
      },
      )
        .then((response) => {
          //this.setState({loader: false});
          if(this.props.onEnd)
            this.props.onEnd(response);
        })
        .catch((error) => {
          //this.setState({loader: false});
          if(this.props.onEnd)
            this.props.onEnd(error);
        });
    
  };

  downloadDocuments(e, document) {
    e.preventDefault();
    let params = {
      documentId: document.id,
    };
    const filename = document.documentTypes + ".jpg";
    callDownloadApi("get", ApiConstants.FETCH_DOCUMENT + document.id, null, filename, false).catch((error) => {
      toastService.error(error.message);
    });
  };

  render() {
    return (
      (this.props.doc && !this.state.uploader) ? 
      <div className="filepond--wrapper">
        <div className="filepond--root filepond--hopper" >
          <div style={{padding: "17px", backgroundColor: 'white'}}>
            <div style={{ textAlign: 'center' }}>
              
                <label>
                    {this.props.label}
                </label>
              
            </div>
            <div style={{ textAlign: 'center' }}>
              <a href='#' target="_blank" style={{ color: "#009fff" }} onClick={(e) => this.downloadDocuments(e, this.props.doc)}>
                Download
              </a>
            </div>
            <div style={{ textAlign: 'center' }}>
              <a href="#" style={{ color: "#009fff" }} onClick={() => this.setState({ uploader: true })}>
                Remove
              </a>
            </div>
          </div>
        </div>
      </div>
      :
      <>
        <AppLoader show={this.state.loader} />
        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={false}
          allowReorder={false}
          maxFiles={1}
          name={this.props.type || "doc"}
          allowProcess={false}
          allowRemove={true}
          credits={false}
          instantUpload={false}
          labelIdle={ "Drag & Drop OR Upload " + (this.props.label || "File")}
          onupdatefiles={fileItems => {
            if(fileItems.length > 0){
              const base64 = fileItems[0].getFileEncodeBase64String();
              if(base64){
                this.pushDocument(base64, fileItems[0].filename);
              }
            }
            // Set currently active file objects to this.state
            //this.setState({
              //files: fileItems.map(fileItem => fileItem.file)
            //});
          }}
        />
      </>
    );
  }
}

export default FileUploader;