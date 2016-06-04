import React, {PropTypes} from 'react';

const Item = (props) => (
  <li className="tasks-item">
    <div className="item-check">
      <input type="checkbox"  />
    </div>
    <div className="item-name">
      {props.name}
    </div>
    <div className="item-count">
      {props.count}
    </div>
    <div className="item-delete">
      <img src="/images/cross.svg"></img>
    </div>
  </li>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default Item;
