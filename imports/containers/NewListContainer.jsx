import React, {Component, PropTypes} from 'react';
import NewList from '../ui/NewList.jsx';

class NewListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNewList: false,
      newListText: ''
    };
  }

  _handleAddList() {
    this.setState({
      addingNewList: true,
      newListText: ''
    });
  }

  _handleInputChange(event) {
    this.setState({
      newListText: event.target.value
    })
  }

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.addList();
    } else if (event.key === 'Escape') {
      this.finishEdit();
    }
  }

  addList() {
    if (!this.state.newListText || this.state.newListText == ''){
      return;
    }
    Meteor.call('lists.create', this.props.tripId, this.state.newListText);
    this.finishEdit();
  }

  finishEdit() {
    this.setState({
      addingNewList: false,
      newListText: ''
    });
  }

  render() {
    return (
      <NewList
        addingNewList={this.state.addingNewList}
        text={this.state.newListText}
        addListClick={this._handleAddList.bind(this)}
        inputChange={this._handleInputChange.bind(this)}
        keyPressed={this._handleKeyPress.bind(this)}
        actionClick={this.addList.bind(this)}
        cancelClick={this.finishEdit.bind(this)}
        />
    )
  }
}

NewListContainer.propTypes = {
  tripId: PropTypes.string.isRequired
}

export default NewListContainer;
