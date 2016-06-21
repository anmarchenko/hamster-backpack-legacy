import React, {Component} from 'react';
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
      <NewList addingNewList={this.state.addingNewList} text={this.state.newListText}/>
    )
  }
}

export default NewListContainer;
