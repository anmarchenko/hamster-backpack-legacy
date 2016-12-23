import React, {Component, PropTypes} from 'react'

import {Translate} from 'react-i18nify'

// Landing page with CTA button
class Landing extends Component {
  render() {
    return (
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
              <button className="button-primary" onClick={this.props.onNewTrip}>
                <Translate value="landing.start_button"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  onNewTrip: PropTypes.func.isRequired
};

export default Landing;
