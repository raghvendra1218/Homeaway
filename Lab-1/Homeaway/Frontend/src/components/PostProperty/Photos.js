import React from 'react';
import './postproperty.css';
const photos =(props)=> {
    return (
        <div className="col-md-7 content-panel-container center-property-form">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div data-reactroot="" className="listing-editor">
                        <div>
                            <div>
                                <div className="panel panel-default pyl-photos">
                                    <div>
                                        <div className="le-nav-header">
                                            <h1 className="nav-header-text">Add up to 5 photos of your property</h1>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    <div className="pyl-photos-container">
                                        <div className="pyl-photos-content">
                                            <div className="pyl-photos-photo-drop">
                                                <div id="inside-upload-area">
                                                    <div className="pyl-photos-photo-drop-inside">
                                                        <h1 className="photo-drop-title text-muted">Drop photos here</h1>
                                                        <h1 className="photo-drop-OR text-muted">or</h1>
                                                        <h1 className="photo-drop-error text-muted">Only JPEG images are supported</h1>
                                                        <div><label for="uploadPhotoInput" className="photo-drop-button btn btn-primary btn-rounded btn-sm">SELECT
                                                PHOTOS TO UPLOAD</label><input type="file" id="uploadPhotoInput"
                                                                multiple="" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pyl-photos-shot-list"></div>
                                            <div className="panel-control step-footer-wrapper">
                                                <div className="row">
                                                    <div className="col-xs-6"><a className="btn btn-default btn-rounded btn-sm" label="Back" href="/pob/checklist/121.7360001.6717288"
                                                        type="button"><span className="btn__label">Back</span></a>
                                                    </div>
                                                    <div className="col-xs-6"><a className="btn btn-primary btn-rounded btn-sm" label="Next" href="/pob/checklist/121.7360001.6717288/propertyDetails"
                                                        type="button"><span className="btn__label">Next</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default photos;