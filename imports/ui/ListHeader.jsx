import React from 'react';
import PropTypes from 'prop-types';

const renderCollapseButton = (collapsed, toggleCollapsed) => {
  let className = null;
  if (collapsed) {
    className = 'rotated';
  }
  return (
    <div className="list-collapse" onClick={toggleCollapsed}>
      <img className={className} src="/images/arrow-down.svg"/>
    </div>
  );
};

const headerClass = (done) => {
  if (done) {
    return 'done';
  }
  return null;
}

const ListHeader = (props) => (
  <header className={headerClass(props.done)}>
    <div className="list-name" onClick={props.startEdit}>
      {props.name}
    </div>
    {renderCollapseButton(props.collapsed, props.toggleCollapsed)}
    <div className="list-delete" onClick={props.clickDelete}>
      <img src="/images/trash.svg"/>
    </div>
  </header>
)

ListHeader.propTypes = {
  name: PropTypes.string.isRequired,
  clickDelete: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired
};

export default ListHeader;
