import React, {PropTypes} from 'react';

import ListHeader from './ListHeader';
import ListEditHeader from './ListEditHeader';

const List = (props) => (
  <div className="tasks-list">
    {props.edit
      ? (<ListEditHeader editNameText={props.editNameText} changeCallback={props.changeValue}
            finishEdit={props.finishEdit}
            inputKeyPressed={props.inputKeyPressed}
            cancelEdit={props.cancelEdit}
        />)
      : (<ListHeader name={props.name} clickDelete={props.clickDelete} startEdit={props.startEdit}
                     toggleCollapsed={props.toggleCollapsed} collapsed={props.collapsed}/>)
}
    <ul>
      {props.children}
    </ul>
  </div>
)

List.propTypes = {
  name: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  editNameText: PropTypes.string.isRequired,
  clickDelete: PropTypes.func.isRequired,
  startEdit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  finishEdit: PropTypes.func.isRequired,
  inputKeyPressed: PropTypes.func.isRequired,
  children: PropTypes.array,
  collapsed: PropTypes.bool.isRequired,
  toggleCollapsed: PropTypes.func.isRequired
};

export default List;
