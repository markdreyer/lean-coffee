import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import PlayArrow from "@material-ui/icons/PlayArrow";
import ArrowForward from "@material-ui/icons/ArrowForward";
import AddIcon from "@material-ui/icons/Add";
import StopIcon from "@material-ui/icons/Stop";
import "./Timer.css";
import moment from "moment";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      counter: 0,
      initialCountdown: 480,
      countdown: 0
    };
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);

    this.buzzer = undefined;

    var momentDurationFormatSetup = require("moment-duration-format");
    momentDurationFormatSetup(moment);
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

  start() {
    let timer = setInterval(this.tick, 1000);
    this.setState({
      timer: timer
    });
    this.initAudio();

    // Resume/Start animation
    var shadeStyle = document.querySelector("#shade").style;

    if (shadeStyle.webkitAnimationPlayState !== "paused") {
      shadeStyle.animation = `drainit ${this.state.counter}s ease-in forwards`;
    } else {
      shadeStyle.webkitAnimationPlayState = "running";
    }
  }

  startSeconds(seconds) {
    let timer = setInterval(this.tick, 1000);
    this.setState({
      timer: timer,
      counter: seconds,
      countdown: seconds,
      timerExpired: false
    });

    document.querySelector("#shade").style.animation =
      "stopanimation 1s ease-in forwards";
  }

  stop() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({
      timer: undefined
    });

    document.querySelector("#shade").style.webkitAnimationPlayState = "paused";
  }

  reset() {
    this.stop();
    this.setState({
      counter: this.state.initialCountdown,
      countdown: this.state.initialCountdown,
      timerExpired: false,
      timer: undefined
    });
    document.querySelector("#shade").style.animation =
      "stopanimation 1s ease-in forwards";
  }

  tick() {
    let { counter } = this.state;
    if (counter - 1 <= 0) {
      this.stop();
      this.buzz();
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

  // Chrome requires user action to play sound so
  // we must call .play() on a user action to initialize
  initAudio() {
    this.buzzer = new Audio("buzz.mp3");
    this.buzzer.muted = true;
    this.buzzer.play();
  }

  buzz() {
    this.buzzer.muted = false;
    this.buzzer.play();
    window.navigator.vibrate(2000);
  }

  render() {
    const { timer, timerExpired } = this.state;

    return (
      <>
        <h1>{moment.duration(this.state.counter, "s").format("m:ss")}</h1>

        {!timerExpired && (
          <div>
            {timer && (
              <Button
                color="primary"
                variant="contained"
                size="large"
                startIcon={<StopIcon />}
                onClick={() => this.stop()}
              >
                Stop
              </Button>
            )}
            {!timer && (
              <Button
                color="primary"
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                onClick={() => this.start()}
              >
                Start
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<ArrowForward />}
              onClick={() => this.reset()}
            >
              Next Topic
            </Button>
          </div>
        )}
        {timerExpired && (
          <div>
            {timer && (
              <Button
                color="primary"
                variant="contained"
                size="large"
                startIcon={<StopIcon />}
                onClick={() => this.stop()}
              >
                Stop
              </Button>
            )}
            {!timer && (
              <Button
                color="primary"
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => this.startSeconds(this.getNextCountdown())}
              >
                {moment.duration(this.getNextCountdown(), "s").format("m")}{" "}
                More?
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={<ArrowForward />}
              onClick={() => this.reset()}
            >
              Next Topic
            </Button>
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
