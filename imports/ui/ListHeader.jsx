import React, {PropTypes} from 'react';

const ListHeader = (props) => (
  <header>
    <div className="list-name" onClick={props.startEdit}>
      {props.name}
    </div>
    <div className="list-delete" onClick={props.clickDelete}>
      <img src="/images/trash.svg"/>
    </div>
  </header>
)

ListHeader.propTypes = {
  name: PropTypes.string.isRequired,
  clickDelete: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired
};

export default ListHeader;
