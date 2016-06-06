import React, {Component, PropTypes} from 'react';

import Item from '../ui/Item.jsx';

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

  render() {
    return (<Item name={this.props.item.name} count={this.props.item.count} checked={this.props.item.checked} onClickCheck={this.checkItem.bind(this)} onClickDelete={this.deleteItem.bind(this)} edit={this.state.edit}/>)
  }
}

ItemContainer.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemContainer;
