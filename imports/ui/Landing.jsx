import React, {Component, PropTypes} from 'react'

import {I18n} from 'react-i18nify'
import {Translate} from 'react-i18nify'

import NavbarContainer from '../containers/NavbarContainer.jsx'

// Landing page with CTA button
export default class Landing extends Component {
  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale);
  }

  openForm() {
    this.context.router.push(`/${this.props.routeParams.locale}/new`);
  }

  render() {
    return (
      <span>
        <NavbarContainer/>

        <div className="container">
          <div className="landing">
            <div className="row usage-steps">
              <div className="four columns usage-step">
                <img className="usage-image" src="/images/checklist.svg"></img>
                <div className="usage-text">
                  <p>
                    <Translate value="landing.step1_header"/>
                  </p>
                </div>
                <div className="usage-text-secondary">
                  <p>
                    <Translate value="landing.step1_text"/>
                  </p>
                </div>
              </div>
              <div className="four columns usage-step">
                <img className="usage-image" src="/images/checked.svg"></img>
                <div className="usage-text">
                  <p>
                    <Translate value="landing.step2_header"/>
                  </p>
                </div>
                <div className="usage-text-secondary">
                  <p>
                    <Translate value="landing.step2_text"/>
                  </p>
                </div>
              </div>
              <div className="four columns usage-step">
                <img className="usage-image" src="/images/backpack.svg"></img>
                <div className="usage-text">
                  <p>
                    <Translate value="landing.step3_header"/>
                  </p>
                </div>
                <div className="usage-text-secondary">
                  <p>
                    <Translate value="landing.step3_text"/>
                  </p>
                </div>
              </div>
            </div>
            <div className="row cta-row">
              <div className="twelve columns">
                <button className="button-primary" onClick={this.openForm.bind(this)}>
                  <Translate value="landing.start_button"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </span>
    );
  }
}

Landing.propTypes = {
  routeParams: PropTypes.object
};

Landing.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Landing;
