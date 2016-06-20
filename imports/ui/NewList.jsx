import React, {PropTypes} from 'react';
import {Translate} from 'react-i18nify'

const NewList = (props) => (
  <div className="new-list">
    {props.addingNewList ? (<input />) : (
      <a href="javascript:void(0);">
        <Translate value="lists.add_list" />
      </a>
      )
    }
  </div>
)

NewList.propTypes = {
  addingNewList: PropTypes.bool.isRequired
};

export default NewList;
