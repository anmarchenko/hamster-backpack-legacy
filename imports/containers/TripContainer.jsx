import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';
import { I18n } from 'react-i18nify';

import Masonry from 'react-masonry-component';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import Trip from '../ui/Trip.jsx';
import ListContainer from './ListContainer.jsx';
import NewListContainer from './NewListContainer.jsx';
import NavbarContainer from '../containers/NavbarContainer.jsx';

import { Trips, Lists } from '../api/collections.js';

const SortableList = SortableElement(({item}) =>
  <ListContainer list={item} />
);

const SortableTrip = SortableContainer(({items}) => {
  return (
    <Masonry className="tasks-area" enableResizableChildren={true}>
      {items.map((item, index) => (
        <SortableList key={item._id} item={item} index={index} />
      ))}
    </Masonry>
  );
});

class TripContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      editedNameText: ''
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    Meteor.call(
      'lists.reorder',
      arrayMove(this.props.lists, oldIndex, newIndex)
    );
  }

  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale)
  }

  _handleNameClick() {
    this.setState({
      editName: true,
      editedNameText: this.props.trip.name
    });
  }

  _handleInputChange(event) {
    this.setState({
      editedNameText: event.target.value
    });
  }

  _handleFocusLost() {
    this.cancelEdit();
  }

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.updateName();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }

  updateName() {
    if (!this.state.editedNameText || this.state.editedNameText === ''){
      return;
    }
    Meteor.call('trips.update', this.props.trip._id, this.state.editedNameText);
    this.cancelEdit();
  }

  cancelEdit() {
    this.setState({
      editName: false
    });
  }

  renderLists() {
    return (
      <SortableTrip items={this.props.lists} onSortEnd={this.onSortEnd} axis="xy" pressDelay={100} />
    )
  }

  render() {
    if (!this.props.trip) {
      return (<div></div>)
    }
    return (
      <span>
        <NavbarContainer routeParams={this.props.routeParams} location={this.props.location} />
        <Trip
          tripName={this.props.trip.name || ''}
          tripId={this.props.trip._id || ''}
          days={this.props.trip.days}
          nights={this.props.trip.nights}

          edit={this.state.editName}
          editedText={this.state.editedNameText}
          onNameClick={this._handleNameClick.bind(this)}
          onInputChange={this._handleInputChange.bind(this)}
          onFocusLost={this._handleFocusLost.bind(this)}
          onKeyPress={this._handleKeyPress.bind(this)}
        >
          {this.renderLists()}
          <NewListContainer tripId={this.props.trip._id || ''} />
        </Trip>
      </span>
    )
  }
}

TripContainer.propTypes = {
  trip: PropTypes.object,
  lists: PropTypes.array,
  routeParams: PropTypes.object,
  location: PropTypes.object
};

TripContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default createContainer(({params}) => {
  Meteor.subscribe('trips.by_id', params.trip_id);
  Meteor.subscribe('lists.by_trip_id', params.trip_id);
  Meteor.subscribe('items.by_trip_id', params.trip_id);
  return {
    trip: Trips.findOne(params.trip_id),
    lists: Lists.find({}, { sort: { position: 1 } }).fetch()
  };
}, TripContainer);
