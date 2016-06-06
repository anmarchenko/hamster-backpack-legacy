import React, {PropTypes} from 'react';

const Item = (props) => (
  <li className={`tasks-item ${ (props.checked
    ? "checked"
    : "")}`}>
    <div className="item-check" onClick={props.onClickCheck}>
      <input type="checkbox"/>
    </div>
    <div className="item-name">
      {props.name}
    </div>
    <div className="item-count">
      {props.count}
    </div>
    <div className="item-delete" onClick={props.onClickDelete}>
      <img src="/images/cross.svg"></img>
    </div>
  </li>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  onClickCheck: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default Item;
