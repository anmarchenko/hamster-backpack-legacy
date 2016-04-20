import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.taskChecked ? 'checked' : '';

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.props.deleteTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.taskChecked || false}
          onClick={this.props.checkTask}
        />

        <span className="text">{this.props.taskText}</span>
      </li>
    );
  }
}

Task.propTypes = {
  taskText: PropTypes.string.isRequired,
  taskChecked: PropTypes.bool,
  checkTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};
