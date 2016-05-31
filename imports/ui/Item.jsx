import React, {Component, PropTypes} from 'react'
import {Translate} from 'react-i18nify'

Item = (props) => (
  <li className="tasks-item">
    <div className="item-form">
      {props.name}
    </div>
  </li>
)

Item.propTypes = {
  name: PropTypes.string.isRequired
}

export default Item
