import React, {Component, PropTypes} from 'react';

import NewItem from '../ui/NewItem.jsx';

class NewItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<NewItem/>)
  }
}

NewItemContainer.propTypes = {};

export default NewItemContainer;
