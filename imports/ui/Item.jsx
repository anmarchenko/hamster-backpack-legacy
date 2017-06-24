import React from 'react';
import PropTypes from 'prop-types';

const Item = (props) => (
  <span>
    <div className="item-check" onClick={props.onClickCheck}>
      <input type="checkbox"/>
    </div>
    <div className="item-name" onClick={props.onClickText}>
      {props.name}
    </div>
    <div className="item-count" onClick={props.onClickText}>
      {props.count}
    </div>
    <div className="item-delete" onClick={props.onClickDelete}>
      <img src="/images/cross.svg"></img>
    </div>
  </span>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClickCheck: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickText: PropTypes.func.isRequired
};

export default Item;
