import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
function Task(props) {
  // Give tasks a different className when they are checked off,
  // so that we can style them nicely in CSS
  const taskClassName = props.taskChecked ? 'checked' : '';

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={props.deleteTask}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={props.taskChecked || false}
        onClick={props.checkTask}
      />

      <span className="text">{props.taskText}</span>
    </li>
  );
}

Task.propTypes = {
  taskText: PropTypes.string.isRequired,
  taskChecked: PropTypes.bool,
  checkTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default Task;
