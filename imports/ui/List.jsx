import React, { PropTypes } from 'react';

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
  name: PropTypes.string.isRequired,
  children: PropTypes.array
};

export default List;
