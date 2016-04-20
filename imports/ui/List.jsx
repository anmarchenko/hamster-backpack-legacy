import React, { Component, PropTypes } from 'react';

import TaskContainer from '../containers/TaskContainer.jsx';

// List component - represents the task list
function List(props) {
  return (
    <div className="container">
      <header>
        <h1>Todo List ({props.incompleteCount})</h1>

        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={props.hideCompleted}
            onClick={props.toggleHideCompleted}
          />
          Hide Completed Tasks
        </label>

        <form className="new-task" onSubmit={props.handleSubmit} >
          <input
            type="text"
            placeholder="Type to add new tasks"
            value={props.newTask}
            onChange={props.handleInputChange}
          />
        </form>
      </header>

      <ul>
        {props.children}
      </ul>
    </div>
  );
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
