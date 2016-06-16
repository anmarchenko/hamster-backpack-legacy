import React, {PropTypes} from 'react';

const ListEditHeader = (props) => (
  <header>
    <span className="list-name">
      <input type="text" value={props.editNameText} />
    </span>
  </header>
)

ListEditHeader.propTypes = {
  editNameText: PropTypes.string.isRequired
};

export default ListEditHeader;
