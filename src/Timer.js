import React, { Component } from "react";
import { connect } from "react-redux";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      counter: 0,
      initialCountdown: 12, //300,
      countdown: 0
    };
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    this.setState({
      counter: this.state.initialCountdown,
      countdown: this.state.initialCountdown
    });
  }

  componentWillUnmount() {
    this.stop();
  }

  start(seconds) {
    let timer = setInterval(this.tick, 1000);
    this.setState({
      timer: timer,
      counter: seconds || this.state.initialCountdown,
      countdown: this.getNextCountdown(),
      timerExpired: false
    });
  }

  stop() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({
      timer: undefined
    });
  }

  reset() {
    this.stop();
    this.setState({
      counter: this.state.initialCountdown,
      countdown: this.state.initialCountdown,
      timerExpired: false,
      timer: undefined
    });
  }

  tick() {
    let { counter } = this.state;
    if (counter - 1 <= 0) {
      this.stop();
      this.setState({
        counter: 0,
        timerExpired: true
      });
    } else {
      this.setState({
        counter: counter - 1
      });
    }
  }

  getNextCountdown() {
    let minCountDown = this.state.initialCountdown / 4;
    let nextCountDown = this.state.countdown / 2;
    return nextCountDown <= minCountDown ? minCountDown : nextCountDown;
  }

  render() {
    const { timer, countdown, timerExpired } = this.state;

    return (
      <>
        <h1>Seconds: {this.state.counter}</h1>
        {!timerExpired && (
          <div className="list-flex">
            {timer && <button onClick={() => this.stop()}>Stop</button>}
            {!timer && <button onClick={() => this.start()}>Start</button>}
            <button onClick={() => this.reset()}>Reset</button>
          </div>
        )}
        {timerExpired && (
          <div className="list-flex">
            <button onClick={() => this.start(countdown)}>
              {countdown} More?
            </button>
            <button onClick={() => this.reset()}>Next Topic</button>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { timerExpired, timer, countdown, counter } = state;
  return { timerExpired, timer, countdown, counter };
}

export default connect(mapStateToProps)(Timer);
