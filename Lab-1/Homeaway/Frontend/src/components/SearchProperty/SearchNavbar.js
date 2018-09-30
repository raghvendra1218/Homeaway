import React from 'react';

const searchNavbar =(props) => {
    return(
        <div><br />
            <form>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <div className="form-group floating-label not-empty">
                            <input className="form-control" aria-label="Where"
                                aria-invalid="false" id="where" name="Where" type="text" value ={props.city}/>
                            <label className="" for="where">Where</label>
                        </div>
                    </div>
                    {/* <div className="form-group col-md-3">
                        <input type="text" class="form-control" placeholder="First name" />
                    </div> */}
                    <div className="searchbox-input searchbox-input-arrive form-group col-md-2 has-icon">
                        <input className="form-control js-startDate" aria-label="Date" aria-invalid="false" id="startdate" tabIndex="3" name="startDate" type="date" value={props.startDate}/>
                        <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
                        <label className="sr-only" for="stab-searchbox-start-date">Arrive</label>
                    </div>
                    <div className="searchbox-input searchbox-input-depart form-group col-md-2 has-icon">
                        <input className="form-control js-endDate" aria-label="Date" aria-invalid="false" id="enddate" name="endDate" type="date" value={props.endDate}/>
                        <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
                    </div>
                    <div className="form-group col-md-2">
                        <div className="form-group floating-label not-empty">
                            <input className="form-control" aria-label="Guests"
                                aria-invalid="false" id="where" name="Guests" type="number" min="0" value={props.headCount}/>
                            <label className="" for="where">Guests</label>
                        </div>
                    </div>
                </div>
            </form><br /><br /><br />
        </div>
    )
}

export default searchNavbar;