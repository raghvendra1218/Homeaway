import React from "react";

const FilterNavbar = (props) => {
  return (
    <div>
      <form>
        <span style={{ paddingLeft: "15px" }}>Price Filter: </span>
        <span style={{ paddingLeft: "275px" }}>Bedroom Filter: </span>
        <div class="form-row align-items-center">
          <div className="form-group col-sm-1 my-1">
            <div className="form-group floating-label not-empty">
              <input
                className="form-control"
                aria-label="Where"
                aria-invalid="false"
                id="where"
                name="Where"
                min = "0"
                max = "1000"
                type="number"
                value = {props.minimumPrice}
                onChange = {props.changeMinPrice}
              />
              <label className="" for="where">
                Minimum
              </label>
            </div>
          </div>
          <div className="form-group col-sm-1 my-1">
            <div className="form-group floating-label not-empty">
              <input
                className="form-control"
                aria-label="Where"
                aria-invalid="false"
                id="where"
                name="Where"
                type="number"
                min = "0"
                max ="1000"
                value = {props.maximumPrice}
                onChange = {props.changeMaxPrice}
              />
              <label className="" for="where">
                Maximum
              </label>
            </div>
          </div>
          <div className="form-group col-sm-1">
            <button
              className="btn btn-primary btn-sm searchbox-submit js-searchSubmit"
              type="button"
              tabindex="5"
              style={{ color: "#fff" }}
              onClick= {props.applyPrice}
            >
              {/* <Link to= "/searchproperty" onClick = {this.searchHandler} style= {{color:"#fff"}}>Search</Link> */}
              Apply
            </button>
          </div>
          <div className="form-group col-sm-1">
            <div className="form-group floating-label not-empty">
              <input
                className="form-control"
                aria-label="Where"
                aria-invalid="false"
                id="where"
                name="Where"
                type="number"
                min ="0"
                max ="100"
                value = {props.numberOfBedroom}
                onChange = {props.changeBedroom}
              />
              <label className="" for="where">
                Bedrooms
              </label>
            </div>
          </div>
          <div className="form-group col-sm-1">
            <button
              className="btn btn-primary btn-sm searchbox-submit js-searchSubmit"
              type="button"
              tabindex="5"
              style={{ color: "#fff" }}
              onClick = {props.applyBedroom}
            >
              {/* <Link to= "/searchproperty" onClick = {this.searchHandler} style= {{color:"#fff"}}>Search</Link> */}
              Apply
            </button>
          </div>
          <div className="col-sm-1">
            <button
              className="btn btn-book btn-sm btn-default"
              type="button"
              tabindex="5"
              onClick = {props.clearPrice}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
      <br />
      <br />
      <br />
    </div>
  );
};
export default FilterNavbar;
