import React from 'react';

const PropertySearchBar =(props) => {
    return(
        <div>
            <div className="col-md-3" style={{ paddingLeft: "30px" }}>
                <div className="form-group floating-label not-empty">
                    <input className="form-control" aria-label="Where"
                        aria-invalid="false" id="where" name="Where" type="text" value={props.propHeadlineInput} onChange={props.changeHeadline} />
                    <label className="" for="where">Property Name</label>
                </div>
            </div>
            <div className="form-group col-sm-1">
            <button className="btn btn-primary btn-sm searchbox-submit js-searchSubmit" type="button" tabindex="5" style={{ color: "#fff" }} onClick={props.searchPropHandler}>
                Search
            </button>&nbsp;
            </div>
            <div className="searchbox-input searchbox-input-arrive col-md-2 has-icon">
                <input className="form-control js-startDate" aria-label="Date" aria-invalid="false" id="startdate" tabIndex="3" name="startDate" type="date" value={props.propStartDateInput} onChange={props.changeStartDate} />
                <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
                <label className="sr-only" for="stab-searchbox-start-date">Arrive</label>
            </div>
            <div className="searchbox-input searchbox-input-depart col-md-2 has-icon">
                <input className="form-control js-endDate" aria-label="Date" aria-invalid="false" id="enddate" name="endDate" type="date" value={props.propEndDateInput} onChange={props.changeEndDate} />
                <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
            </div>
            <button className="btn btn-primary btn-sm searchbox-submit js-searchSubmit" type="button" tabindex="5" style={{ color: "#fff" }} onClick={props.searchDtHandler}>
                Search
            </button>&nbsp;&nbsp;
            <button className="btn btn-book btn-sm btn-default" type="button" tabindex="5" onClick={props.changePropHandler}>
                Clear
            </button>
        </div>
    )
}

export default PropertySearchBar;