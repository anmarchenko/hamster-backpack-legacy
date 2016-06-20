import React, {PropTypes} from 'react';

const ListEditHeader = (props) => (
  <header>
    <span className="list-name">
      <input type="text" value={props.editNameText} onChange={props.changeCallback} autoFocus
        onKeyPress={props.inputKeyPressed} onBlur={props.finishEdit}/>
    </span>
  </header>
)

ListEditHeader.propTypes = {
  editNameText: PropTypes.string.isRequired,
  changeCallback: PropTypes.func.isRequired,
  finishEdit: PropTypes.func.isRequired,
  inputKeyPressed: PropTypes.func.isRequired
};

export default ListEditHeader;
