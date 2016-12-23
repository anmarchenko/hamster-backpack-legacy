import React, {PropTypes} from 'react';

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

const ListHeader = (props) => (
  <header>
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
  toggleCollapsed: PropTypes.func.isRequired
};

export default ListHeader;
