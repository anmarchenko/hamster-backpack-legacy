import React, { Component, PropTypes } from 'react';

// Landing page with CTA button
function Landing(props) {
  return (
    <div className="landing">
      <div className="row usage-steps">
        <div className="four columns usage-step">
          <img className="usage-image" src="/images/checklist.svg"></img>
          <div className="usage-text">
            Create list of things to pack
          </div>
          <div className="usage-text-secondary">
            Give us some information about your trip and we will generate packing
            to-do list for you.
          </div>
        </div>
        <div className="four columns usage-step">
          <img className="usage-image" src="/images/checked.svg"></img>
            <div className="usage-text">
              Start packing stuff
            </div>
            <div className="usage-text-secondary">
              Check stuff you already packed, delete what is not needed, add some
              new things to pack.
            </div>
        </div>
        <div className="four columns usage-step">
          <img className="usage-image" src="/images/backpack.svg"></img>
            <div className="usage-text">
              Enjoy your trip!
            </div>
            <div className="usage-text-secondary">
              Grab your backpack and go on with your adventure.
            </div>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
};

export default Landing;
