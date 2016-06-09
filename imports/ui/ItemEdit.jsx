import React, {PropTypes} from 'react';

const ItemEdit = (props) => (
  <li className='tasks-item edit-item'>
    <div className="item-check">
      <input type="checkbox" disabled="disabled"/>
    </div>
    <div className="item-name">
      <input name="item_name" type="text" value={props.text} autoFocus
        onKeyPress={props.onKeyPressed} onBlur={props.onFinish} />
    </div>
    <div className="item-count">
    </div>
    <div className="item-delete">
      <img src="/images/cross.svg"></img>
    </div>
  </li>
);

ItemEdit.propTypes = {
  text: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired,
  onKeyPressed: PropTypes.func.isRequired
};

export default ItemEdit;
