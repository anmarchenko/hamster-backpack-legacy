import React, {PropTypes} from 'react';

const ListHeader = (props) => (
  <header>
    <span className="list-name" onClick={props.startEdit}>
      {props.name}
    </span>
    <span className="list-delete" onClick={props.clickDelete}>
      <img src="/images/trash.svg"/>
    </span>
  </header>
)

ListHeader.propTypes = {
  name: PropTypes.string.isRequired,
  clickDelete: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired
};

export default ListHeader;
