import React, { Component } from "react";
import { connect } from "react-redux";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      counter: 0,
      initialCountdown: 10, //300,
      decrement: 60,
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
      counter: seconds || this.state.initialCountdown
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
      timerExpired: false,
      forceNext: false,
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
            <button onClick={() => this.start(countdown / 2)}>
              {countdown / 2} More?
            </button>
            <button onClick={() => this.reset()}>Next Topic</button>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { timerExpired, timer, decrement, countdown, counter } = state;
  return { timerExpired, timer, decrement, countdown, counter };
}

export default connect(mapStateToProps)(Timer);
