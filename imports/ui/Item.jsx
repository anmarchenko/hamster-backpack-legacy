import React, { Component, PropTypes } from 'react'
import { Translate } from 'react-i18nify'

Item = (props) => (
  <i className="tasks-item">
    --
    {props.name}
    <br />
  </i>
)

Item.propTypes = {
  name: PropTypes.string.isRequired
}

export default Item
