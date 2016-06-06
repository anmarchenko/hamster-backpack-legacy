import React, {PropTypes} from 'react';

const NewItem = (props) => (
  <li className="tasks-item new-item">
    <div className="item-name">
      <input name="item_name" type="text" onChange={props.onNameChanged} onKeyPress={props.onKeyPress} value={props.name}/>
    </div>
    <div className="item-count">
    </div>
    <div className="item-delete" onClick={props.addItem}>
      <img src="/images/plus.svg"></img>
    </div>
  </li>
);

NewItem.propTypes = {
  onNameChanged: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default NewItem;
