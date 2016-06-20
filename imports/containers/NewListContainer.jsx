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

  render() {
    return (
      <NewList/>
    )
  }
}

NewListContainer.propTypes = {
};

export default NewListContainer;
