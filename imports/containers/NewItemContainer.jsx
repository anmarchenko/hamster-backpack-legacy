import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewItem from '../ui/NewItem.jsx';
import Parser from '../utils/parser.js';

class NewItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onNameChanged(event) {
    this.setState({name: event.target.value})
  }

  addItem() {
    if (!this.state.name) {
      return;
    }
    const parsed = Parser.parseItem(this.state.name);
    Meteor.call('items.create', this.props.tripId, this.props.listId, parsed.name, parsed.count);
    this.setState({name: ''})
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.addItem();
    }
  }

  render() {
    return (<NewItem onNameChanged={this.onNameChanged.bind(this)} addItem={this.addItem.bind(this)} onKeyPress={this.onKeyPress.bind(this)} name={this.state.name}/>)
  }
}

NewItemContainer.propTypes = {
  tripId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired
};

export default NewItemContainer;
