import React, { Component, PropTypes } from 'react'
import { Translate } from 'react-i18nify'

List = (props) => (
  <div className="tasks-list">
    <div className="header">
      {props.name}
    </div>
    {props.children}
  </div>
)

List.propTypes = {
  name: PropTypes.string.isRequired
}

export default List
