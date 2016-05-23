import React, { Component, PropTypes } from 'react'
import { I18n } from 'react-i18nify'
import { createContainer } from 'meteor/react-meteor-data';

import Item from '../ui/Item.jsx'

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  render() {
    return (
      <Item name={this.props.item.name} />
    )
  }
}

ItemContainer.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemContainer;
