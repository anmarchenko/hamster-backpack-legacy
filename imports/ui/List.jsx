import React, {Component, PropTypes} from 'react';
import {Translate} from 'react-i18nify';

const List = (props) => (
  <div className="tasks-list">
    <header>
      {props.name}
    </header>
    <ul>
      {props.children}
    </ul>
  </div>
)

List.propTypes = {
  name: PropTypes.string.isRequired
};

export default List;
