import React, {PropTypes} from 'react';

const List = (props) => (
  <div className="tasks-list">
    <header>
      <span className="list-name">
        {props.name}
      </span>
      <span className="list-delete" onClick={props.clickDelete}>
        <img src="/images/trash.svg"/>
      </span>
    </header>
    <ul>
      {props.children}
    </ul>
  </div>
)

List.propTypes = {
  name: PropTypes.string.isRequired,
  clickDelete: PropTypes.func.isRequired,
  children: PropTypes.array
};

export default List;
