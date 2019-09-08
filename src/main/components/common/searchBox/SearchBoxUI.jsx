import React, { Component } from "react";
import propTypes from 'prop-types';
import { TextField } from "@material-ui/core";

export default class SearchBoxUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items || []
    };
  }


  searchTemplate = ({ target }) => {
    const value = target.value.toLowerCase();
    const filterByName = this.props.filterByName

    const items = this.props.items
      .filter((item) => item[filterByName]
      .toLowerCase()
      .includes(value)
    );
    this.setState({ items });
  };
  render() {
    const { label, name, children } = this.props;
    const { items } = this.state;
    const childrenWithProps = React.Children.map(children, child => {
      return items.map((element, num) => (
        React.cloneElement(child, { ...element, num: num + 1 })
      ));
    });
    // JSX
    return (
      <div>
        <TextField
          label={label}
          name={name}
          onChange={this.searchTemplate}
        />
        
        {childrenWithProps}
      </div>
    );
  }
}


SearchBoxUI.propTypes = {
  name: propTypes.string,
  label: propTypes.string,
  items: propTypes.array.isRequired,
  filterByName: propTypes.string.isRequired
};