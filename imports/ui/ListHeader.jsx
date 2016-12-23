import React, {PropTypes} from 'react';

const renderCollapseButton = (collapsed, toggleCollapsed) => {
  let image = null;
  if (collapsed) {
    image = (<img src="/images/arrow-down.svg"/>);
  } else {
    image = (<img src="/images/arrow-down.svg"/>);
  }
  return (
    <div className="list-collapse" onClick={toggleCollapsed}>
      {image}
    </div>
  );
};

const ListHeader = (props) => (
  <header>
    <div className="list-name" onClick={props.startEdit}>
      {props.name}
    </div>
    {renderCollapseButton()}
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
