import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { CSSTransitionGroup } from 'react-transition-group';

import { I18n } from 'react-i18nify';
import SweetAlert from 'sweetalert2';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import List from '../ui/List.jsx';
import ItemContainer from './ItemContainer.jsx';
import NewItemContainer from './NewItemContainer.jsx';

import { Items } from '../api/collections.js';

const SortableItem = SortableElement(({item}) =>
  <ItemContainer item={item} />
);

const SortableList = SortableContainer(({items}) => {
  return (
    <CSSTransitionGroup transitionName="item" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      {items.map((item, index) => (
        <SortableItem key={item._id} item={item} index={index} />
      ))}
    </CSSTransitionGroup>
  );
});

const progress = (items) => {
  const count = items.length;
  if (count == 0) {
    return 0;
  }
  const checkedCount = items.filter((item) => item.checked).length;
  return (checkedCount * 100.0) / count;
}

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editNameText: ''
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    Meteor.call(
      'items.reorder',
      arrayMove(this.props.items, oldIndex, newIndex)
    );
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
      <SortableList items={this.props.items} onSortEnd={this.onSortEnd} lockAxis="y" pressDelay={300} />
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
        progress={progress(this.props.items)}
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
    items: Items.find({list_id: props.list._id}, { sort: { position: 1 } }).fetch()
  };
}, ListContainer);
