import React, {Component, PropTypes} from 'react';

import Item from '../ui/Item.jsx';

class ItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (<Item name={this.props.item.name}/>)
  }
}

ItemContainer.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemContainer;
