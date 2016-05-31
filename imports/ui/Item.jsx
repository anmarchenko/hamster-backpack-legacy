import React, {PropTypes} from 'react';

const Item = (props) => (
  <li className="tasks-item">
    <div className="item-form">
      {props.name}
    </div>
  </li>
);

Item.propTypes = {
  name: PropTypes.string.isRequired
};

export default Item;
