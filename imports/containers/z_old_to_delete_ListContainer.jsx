import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import List from '../ui/List.jsx';
import TaskContainer from './TaskContainer.jsx';

// List component - represents the list of tasks and the input field to add a new task
class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      newTaskText: ''
    };
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <TaskContainer key={task._id} task={task} />
    ));
  }

  handleSubmit(event) {
    event.preventDefault();

    Meteor.call('tasks.insert', this.state.newTaskText);

    this.setState({
      newTaskText: ''
    })
  }

  handleInputChange(event) {
    this.setState({
      newTaskText: event.target.value
    })
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  render() {
    return (
      <List incompleteCount={this.props.incompleteCount}

            newTask={this.state.newTaskText}
            handleInputChange={this.handleInputChange.bind(this)}

            hideCompleted={this.state.hideCompleted}
            toggleHideCompleted={this.toggleHideCompleted.bind(this)}

            handleSubmit={this.handleSubmit.bind(this)}
        >
          {this.renderTasks()}
      </List>
    );
  }
}

ListContainer.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
}, ListContainer);
