import React, {PropTypes} from 'react';
import {I18n, Translate} from 'react-i18nify';

const NewList = (props) => {
  let content = null;
  if (props.addingNewList) {
    content = (
      <div className="new-list-form">
        <input
          type="text"
          name="new_list_name"
          value={props.text}
          onChange={props.inputChange}
          placeholder={I18n.t('lists.add_list_placeholder')}
          onKeyUp={props.keyPressed}
          autoFocus
          />
        <a href="javascript:void(0);" onClick={props.actionClick} className="action-button">
          <img src="/images/check.svg"></img>
        </a>
        <a href="javascript:void(0);" onClick={props.cancelClick} className="cancel-button">
          <img src="/images/cross.svg"></img>
        </a>
      </div>
    )
  } else {
    content = (<a href="javascript:void(0);" onClick={props.addListClick}>
      <img src="/images/plus.svg"></img>
      <Translate value="lists.add_list" />
    </a>)
  }

  return (
    <div className="new-list">
      {content}
    </div>
  )
}

NewList.propTypes = {
  addingNewList: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  addListClick: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  keyPressed: PropTypes.func.isRequired,
  actionClick: PropTypes.func.isRequired,
  cancelClick: PropTypes.func.isRequired
};

export default NewList;
