import React, { Component, PropTypes } from 'react';

import Clipboard from 'clipboard';

class ClipboardButton extends Component {
  componentDidMount() {
    new Clipboard(this.refs.clipboardLink);
  }

  render() {
    return (
      <a href='javascript:void(0);' data-clipboard-text={window.location} ref='clipboardLink'>
        <img src="/images/icon_link_alt.svg"></img>
      </a>
    )
  }
}

ClipboardButton.propTypes = {
  tripId: PropTypes.string.isRequired
};

export default ClipboardButton;
