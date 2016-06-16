import React, {PropTypes} from 'react';

import ListHeader from './ListHeader';
import ListEditHeader from './ListEditHeader';

const List = (props) => (
  <div className="tasks-list">
    {props.edit ? (<ListEditHeader editNameText={props.editNameText}/>) :
                  (<ListHeader name={props.name} clickDelete={props.clickDelete} />)
    }
    <ul>
      {props.children}
    </ul>
  </div>
)

List.propTypes = {
  name: PropTypes.string.isRequired,
  clickDelete: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  editNameText: PropTypes.string.isRequired,
  children: PropTypes.array
};

export default List;
