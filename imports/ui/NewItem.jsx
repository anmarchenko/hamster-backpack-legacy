import React, {PropTypes} from 'react';

const NewItem = (props) => (
  <li className="tasks-item new-item">
    <div className="item-name">
      <input type="text"/>
    </div>
    <div className="item-count">
      <input type="number"/>
    </div>
    <div className="item-delete">
      <img src="/images/plus.svg"></img>
    </div>
  </li>
);

NewItem.propTypes = {};

export default NewItem;
