import React, {Component, PropTypes} from 'react';

import NewItem from '../ui/NewItem.jsx';

class NewItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      count: ""
    };
  }

  onNameChanged(event) {
    this.setState({name: event.target.value})
  }

  onCountChanged(event) {
    this.setState({count: event.target.value})
  }

  addItem() {
    if (!this.state.name) {
      return;
    }
    let count = this.state.count;
    if (!count) {
      count = 1;
    } else {
      count = Number.parseInt(count);
    }
    Meteor.call('items.create', this.props.tripId, this.props.listId, this.state.name, count);
    this.setState({name: '', count: ''})
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.addItem();
    }
  }

  render() {
    return (<NewItem onNameChanged={this.onNameChanged.bind(this)} onCountChanged={this.onCountChanged.bind(this)}
    addItem={this.addItem.bind(this)} onKeyPress={this.onKeyPress.bind(this)} name={this.state.name} count={this.state.count}/>)
  }
}

NewItemContainer.propTypes = {
  tripId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired
};

export default NewItemContainer;
