import React, { Component, PropTypes } from 'react'
import { I18n } from 'react-i18nify'
import { createContainer } from 'meteor/react-meteor-data';

import List from '../ui/List.jsx'
import ItemContainer from './ItemContainer.jsx'

import { Items } from '../api/collections.js';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  renderItems() {
    return (
      <div>
        {this.props.items.map(function(item){
          return (
            <ItemContainer key={item._id} item={item} />
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <List name={this.props.list.name}>
        {this.renderItems()}
      </List>
    )
  }
}

ListContainer.propTypes = {
  list: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default createContainer((props) => {
  return {
    items: Items.find({list_id: props.list._id}).fetch()
  };
}, ListContainer);
