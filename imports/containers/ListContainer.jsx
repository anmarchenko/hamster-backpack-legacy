import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { CSSTransitionGroup } from 'react-transition-group'

import List from '../ui/List.jsx';
import ItemContainer from './ItemContainer.jsx';
import NewItemContainer from './NewItemContainer.jsx';

import {Items} from '../api/collections.js';
import {I18n} from 'react-i18nify'
import SweetAlert from 'sweetalert2';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editNameText: ''
    };
  }

  deleteList() {
    SweetAlert({
      title: I18n.t('confirmations.header'),
      text: I18n.t('confirmations.list_content'),
      confirmButtonText: I18n.t('confirmations.yes_delete'),
      cancelButtonText: I18n.t('confirmations.no_keep'),
      type: 'warning',
      showCancelButton: true
    }).then(function() {
      Meteor.call('lists.delete', this.props.list._id);
    }.bind(this));
  }

  renderItems() {
    return (
      <CSSTransitionGroup transitionName="item" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {this.props.items.map(function(item) {
          return (
            <ItemContainer key={item._id} item={item}/>
          )
        })}
      </CSSTransitionGroup>
    )
  }

  startEdit() {
    this.setState({edit: true, editNameText: this.props.list.name});
  }

  editValueChange(event) {
    this.setState({editNameText: event.target.value});
  }

  updateName() {
    if (this.state.editNameText && this.state.editNameText !== ''){
      Meteor.call('lists.update', this.props.list._id, this.state.editNameText);
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.setState({edit: false, editNameText: ''});
  }

  toggleCollapsed() {
    Meteor.call('lists.updateCollapsed', this.props.list._id, !this.props.list.collapsed);
  }

  inputKeyPressed(event) {
    if (event.key === 'Enter') {
      this.updateName();
    }
  }

  listDone() {
    const { items } = this.props;
    if (!items || items.length === 0) {
      return false;
    }

    return items.reduce((acc, item) => {
      return acc && item.checked;
    }, true);
  }

  render() {
    return (
      <List name={this.props.list.name}
        clickDelete={this.deleteList.bind(this)}
        edit={this.state.edit}
        editNameText={this.state.editNameText}
        startEdit={this.startEdit.bind(this)}
        finishEdit={this.updateName.bind(this)}
        cancelEdit={this.cancelEdit.bind(this)}
        changeValue={this.editValueChange.bind(this)}
        inputKeyPressed={this.inputKeyPressed.bind(this)}
        collapsed={this.props.list.collapsed || false}
        toggleCollapsed={this.toggleCollapsed.bind(this)}
        done={this.listDone()}
      >
        {this.renderItems()}
        <NewItemContainer listId={this.props.list._id} tripId={this.props.list.trip_id} />
      </List>
    )
  }
}

ListContainer.propTypes = {
  list: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default createContainer((props) => {
  return {
    items: Items.find({list_id: props.list._id}).fetch()
  };
}, ListContainer);
