import React from "react";
import propTypes from 'prop-types';
import { TextField } from "@material-ui/core";

const SearchBoxUI = (props) => {

  const handleChange = event => {
    const value = event.target.value;

    props.searchTemplateByName(value);
  }

  return (
    <div className="search-box">
      <TextField
        label={props.label}
        name={props.name}
        onChange={handleChange}
      />
      
    </div>
  );
}


SearchBoxUI.propTypes = {
  name: propTypes.string,
  label: propTypes.string,
  filterByName: propTypes.string.isRequired,
  searchTemplateByName: propTypes.func.isRequired,
};

export default SearchBoxUI;