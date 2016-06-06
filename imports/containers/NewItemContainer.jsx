import React, {Component, PropTypes} from 'react';

import NewItem from '../ui/NewItem.jsx';

class NewItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      count: null
    };
  }

  onNameChanged() {}

  onCountChanged() {}

  addItem() {}

  render() {
    return (<NewItem/>)
  }
}

NewItemContainer.propTypes = {
  tripId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired
};

export default NewItemContainer;
