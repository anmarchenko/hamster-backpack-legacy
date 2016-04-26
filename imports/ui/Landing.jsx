import React, { Component, PropTypes } from 'react';

// Landing page with CTA button
function Landing(props) {
  return (
    <div className="landing">
      <div className="row usage-steps">
        <div className="four columns usage-step">
          <img className="usage-image" src="/images/checklist.svg"></img>
          <div className="usage-text">
            <p>
              Create list of things to pack
            </p>
          </div>
          <div className="usage-text-secondary">
            <p>
              Give us some information about your trip and we will generate packing
              to-do list for you.
            </p>
          </div>
        </div>
        <div className="four columns usage-step">
          <img className="usage-image" src="/images/checked.svg"></img>
            <div className="usage-text">
              <p>
                Start packing stuff
              </p>
            </div>
            <div className="usage-text-secondary">
              <p>
                Check stuff you already packed, delete what is not needed, add some
                new things to pack.
              </p>
            </div>
        </div>
        <div className="four columns usage-step">
          <img className="usage-image" src="/images/backpack.svg"></img>
            <div className="usage-text">
              <p>
                Enjoy your trip!
              </p>
            </div>
            <div className="usage-text-secondary">
              <p>
                Grab your backpack and go on with your adventure.
              </p>
            </div>
        </div>
      </div>
      <div className="row">

      </div>
    </div>
  );
}

Landing.propTypes = {
};

export default Landing;
