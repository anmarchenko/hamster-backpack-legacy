import React, { Component, PropTypes } from 'react';

import TaskContainer from '../containers/TaskContainer.jsx';

// List component - represents the task list
class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.props.hideCompleted}
              onClick={this.props.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>

          <form className="new-task" onSubmit={this.props.handleSubmit} >
            <input
              type="text"
              placeholder="Type to add new tasks"
              value={this.props.newTask}
              onChange={this.props.handleInputChange}
            />
          </form>
        </header>

        <ul>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  incompleteCount: PropTypes.number.isRequired,
  newTask: PropTypes.string.isRequired,
  hideCompleted: PropTypes.bool.isRequired,

  toggleHideCompleted: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default List;
