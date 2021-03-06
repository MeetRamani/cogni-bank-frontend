import React, { Component } from "react";

export default class OtpForm extends Component {
  state = {
    elapsed: 5000,
    start: Date.now(),
    otpCode: ""
  };

  handleChangeOtpForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* This is called before our render function. The object that is
    returned is assigned to this.state, so we can use it later.*/
  getInitialState() {
    return { elapsed: 0 };
  }

  /* componentDidMount is called by react when the component
     has been rendered on the page. We can set the interval here:*/
  componentDidMount() {
    this.timer = setInterval(this.tick, 500, this);
    this.timer2 = setTimeout(() => {
      console.log("inside timeout");
      this.props.timeHandleChange();
    }, 5000);
  }

  /* This method is called immediately before the component is removed
     from the page and destroyed. We can clear the interval here:*/
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick(timerSelf) {
    timerSelf.doTick();
  }

  doTick() {
    this.setState({ elapsed: 5000 - (new Date() - this.state.start) });
  }

  render() {
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(1);

    return (
      <div id="otpForm">
        <p>
          This example was started <b>{seconds} seconds</b> ago.
        </p>
        <form method="POST">
          <label>
            We've sent you verfication code, please enter to proceed{" "}
          </label>
          <input
            type="text"
            id="otpCode"
            name="otpCode"
            onChange={this.handleChangeOtpForm}
          />
          <button
            type="button"
            id="submitOtp"
            onClick={() => this.props.sendOTP(this.state.otpCode)}
          >
            Submit OTP{" "}
          </button>
        </form>
      </div>
    );
  }
}
