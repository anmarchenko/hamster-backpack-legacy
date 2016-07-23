import React, { Component, PropTypes } from 'react';

import { I18n } from 'react-i18nify';

import Clipboard from 'clipboard';
import toastr from 'toastr';

class ClipboardButton extends Component {
  componentDidMount() {
    const clipboard = new Clipboard(this.refs.clipboardLink);
    clipboard.on('success', function(){
        toastr.success(I18n.t('notifications.link_copied'));
      }
    )
  }

  render() {
    return (
      <a href='javascript:void(0);'
        data-clipboard-text={window.location}
        ref='clipboardLink'
        className='clipboard-link'
      >
        <img src="/images/icon_link_alt.svg"></img>
      </a>
    )
  }
}

ClipboardButton.propTypes = {
  tripId: PropTypes.string.isRequired
};

export default ClipboardButton;
