import React from 'react';

const searchNavbar =(props) => {
    return(
        <div><br />
                <div className="form-row">
                    <div className="col-md-3">
                        <div className="form-group floating-label not-empty">
                            <input className="form-control" aria-label="Where"
                                aria-invalid="false" id="where" name="Where" type="text" value ={props.city} onChange ={props.changeCity}/>
                            <label className="" for="where">Where</label>
                        </div>
                    </div>
                    <div className="searchbox-input searchbox-input-arrive col-md-2 has-icon">
                        <input className="form-control js-startDate" aria-label="Date" aria-invalid="false" id="startdate" tabIndex="3" name="startDate" type="date" value={props.startDate} onChange ={props.changeStartDate}/>
                        <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
                        <label className="sr-only" for="stab-searchbox-start-date">Arrive</label>
                    </div>
                    <div className="searchbox-input searchbox-input-depart col-md-2 has-icon">
                        <input className="form-control js-endDate" aria-label="Date" aria-invalid="false" id="enddate" name="endDate" type="date" value={props.endDate} onChange ={props.changeEndDate}/>
                        <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group floating-label not-empty">
                            <input className="form-control" aria-label="Guests"
                                aria-invalid="false" id="where" name="Guests" type="number" min="0" value={props.headCount} onChange = {props.changeHeadCount}/>
                            <label className="" for="where">Guests</label>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg searchbox-submit js-searchSubmit"  type="button" tabindex="5" style= {{color:"#fff"}} onClick = {props.searchPropHandler}>
                        {/* <Link to= "/searchproperty" onClick = {this.searchHandler} style= {{color:"#fff"}}>Search</Link> */}
                        Search
                    </button>
                </div><br/>
        </div>
        
    )
}

export default searchNavbar;