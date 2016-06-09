import React, {Component, PropTypes} from 'react';

import Item from '../ui/Item.jsx';
import ItemEdit from '../ui/ItemEdit.jsx';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
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
      this.setState({edit: true});
    }
  }

  saveItem() {
    this.setState({edit: false});
  }

  editKeyPressed(event) {
    if (event.key === 'Enter') {
      this.saveItem();
    }
  }

  updateItem(event) {
    const text = event.target.value;
  }

  render() {
    if (this.state.edit) {
      return (<ItemEdit text={`${this.props.item.name} ${this.props.item.count}`}
                        onFinish={this.saveItem.bind(this)}
                        onKeyPressed={this.editKeyPressed.bind(this)} />)
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
