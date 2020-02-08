import React, { Component } from "react";
import { connect } from "react-redux";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      counter: 0,
      initialCountdown: 300,
      decrement: 60,
      countdown: 0
    };
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    this.setState({ counter: this.state.initialCountdown });
  }

  componentWillUnmount() {
    this.stop();
  }

  start() {
    let timer = setInterval(this.tick, 1000);
    this.setState({ timer: timer, countdown: this.state.counter });
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
      timerAlert: false,
      forceNext: false,
      timer: undefined
    });
  }

  tick() {
    let { counter, countdown, decrement } = this.state;
    if (counter - 1 <= 0) {
      this.stop();
      this.setState({
        counter: 0,
        timerAlert: true,
        forceNext: countdown - decrement <= 0
      });
    } else {
      this.setState({
        counter: counter - 1
      });
    }
  }

  render() {
    return <h1>Seconds: {this.state.counter}</h1>;
  }
}

function mapStateToProps(state) {
  const { timerAlert, timer, decrement, countdown, counter } = state;
  return { timerAlert, timer, decrement, countdown, counter };
}

export default connect(mapStateToProps)(Timer);
