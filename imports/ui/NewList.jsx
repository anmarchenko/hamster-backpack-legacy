import React, {PropTypes} from 'react';
import {Translate} from 'react-i18nify'

const NewList = (props) => (
  <div className="new-list">
    {props.addingNewList ? (<input name="new_list_name" value={props.text} />) : (
      <a href="javascript:void(0);">
        <Translate value="lists.add_list" />
      </a>
      )
    }
  </div>
)

NewList.propTypes = {
  addingNewList: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default NewList;
