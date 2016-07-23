import React, {Component, PropTypes} from 'react';

import Item from '../ui/Item.jsx';
import ItemEdit from '../ui/ItemEdit.jsx';

import Parser from '../utils/parser.js';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editedText: ''
    };
  }

  checkItem() {
    Meteor.call('items.check', this.props.item._id, !this.props.item.checked);
  }

  deleteItem() {
    Meteor.call('items.delete', this.props.item._id);
  }

  editItem() {
    if (!this.props.item.checked) {
      this.setState({edit: true, editedText: `${this.props.item.name} ${this.props.item.count}`});
    }
  }

  cancelEdit() {
    this.setState({edit: false, editedText: ''});
  }

  saveItem() {
    const parsed = Parser.parseItem(this.state.editedText);
    Meteor.call('items.update', this.props.item._id, parsed.name, parsed.count);
    this.cancelEdit();
  }

  editKeyPressed(event) {
    if (event.key === 'Enter') {
      this.saveItem();
    }
  }

  setEditedText(event) {
    this.setState({editedText: event.target.value});
  }

  render() {
    if (this.state.edit) {
      return (<ItemEdit text={this.state.editedText}
                        onFinish={this.saveItem.bind(this)}
                        onCancel={this.cancelEdit.bind(this)}
                        onKeyPressed={this.editKeyPressed.bind(this)}
                        onInputChange={this.setEditedText.bind(this)} />)
    } else {
      return (<Item name={this.props.item.name}
                    count={this.props.item.count}
                    checked={this.props.item.checked}
                    onClickCheck={this.checkItem.bind(this)}
                    onClickDelete={this.deleteItem.bind(this)}
                    onClickText={this.editItem.bind(this)} />)
    }
  }
}

ItemContainer.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemContainer;
