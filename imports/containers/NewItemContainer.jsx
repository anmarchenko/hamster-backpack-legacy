import React, {Component, PropTypes} from 'react';

import NewItem from '../ui/NewItem.jsx';

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
    let name = this.state.name;
    const countString = name.split(/\s+/).pop();
    let count = Number.parseInt(countString)
    if (isNaN(count)) {
      count = 1;
    } else {
      name = name.replace(new RegExp(`${countString}$`), '');
    }
    Meteor.call('items.create', this.props.tripId, this.props.listId, name, count);
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
