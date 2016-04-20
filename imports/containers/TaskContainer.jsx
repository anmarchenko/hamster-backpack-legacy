import React, { Component, PropTypes } from 'react';

import Task from '../ui/Task.jsx'

// Task component - represents a single todo item
export default class TaskContainer extends Component {
  checkTask() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  render() {
    return (
      <Task taskText={this.props.task.text}
        taskChecked={this.props.task.checked}
        checkTask={this.checkTask.bind(this)}
        deleteTask={this.deleteTask.bind(this)}
        />
    );
  }
}

TaskContainer.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
