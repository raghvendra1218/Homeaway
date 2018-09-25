import React from 'react';
import './postproperty.css';

const availability = (props) => {
    return(
        <div class="input-daterange" data-date-format="M d, D">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group form-group-lg form-group-icon-left">
              <label>Check-in</label>
              <input
                class="form-control"
                name="start"
                type="date"
                min="2018-09-28"
                required=""
                value=""
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group form-group-lg form-group-icon-left">
              <label>Check-out</label>
              <input
                class="form-control"
                name="end"
                type="date"
                required=""
                value=""
              />
            </div>
          </div>
        </div>
      </div>
    )
}
export default availability;