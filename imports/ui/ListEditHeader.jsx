import React from 'react';
import PropTypes from 'prop-types';

const ListEditHeader = (props) => (
  <header>
    <span className="list-name">
      <input type="text" value={props.editNameText} onChange={props.changeCallback} autoFocus
        onKeyPress={props.inputKeyPressed} onBlur={props.cancelEdit}/>
    </span>
  </header>
)

ListEditHeader.propTypes = {
  editNameText: PropTypes.string.isRequired,
  changeCallback: PropTypes.func.isRequired,
  finishEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  inputKeyPressed: PropTypes.func.isRequired
};

export default ListEditHeader;
