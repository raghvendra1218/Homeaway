import React from 'react';
import './postproperty.css';

const availability = (props) => {
    return(
      <div id="layout" className="col-md-7 content-panel-container">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="panel-body">
              <div className="checklist-header-container">
                <div className="le-nav-header">
                  <h2 className="nav-header-text">How long the property is available?</h2>
                </div>
                <hr></hr>
              </div>
              <div className="rates-onboarding-rates-page-title">
                <p>We recommend to make available your property for at least one week.You can update the availability later as well.</p>
              </div>
              <form role="form">
                <div class="form-group row">
                  <label for="example-text-input" class="col-2 col-form-label">Start Date</label>
                  <div class="col-10">
                    <div>
                      <input class="form-control" onChange= {props.startDateChange}  title="Start Date" type="date" id="onBoarding-date" />
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="example-text-input" class="col-2 col-form-label">End Date</label>
                  <div class="col-10">
                    <div>
                      <input class="form-control" onChange= {props.endDateChange}  title="End Date" type="date" id="onEnd-date" />
                    </div>
                  </div>
                </div>
                <hr/>
                <div style={{ paddingTop: '10px', paddingBottom: '25px', textAlign: 'center' }} className="panel-control step-footer-wrapper">
                  <div className="row">
                    <div id="back-av" className="col-xs-6">
                      <a className="btn btn-default btn-rounded btn-sm" label="Back" data-toggle="tab" href="#photos"
                        type="button"><span className="btn__label">Back</span></a>
                    </div>
                    <div id="next-av" className="col-xs-6">
                      <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#pricing"
                      type="button"><span className="btn__label">Next</span></a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
export default availability;