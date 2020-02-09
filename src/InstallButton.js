import React, { Component } from "react";
import { Button } from "@material-ui/core";
import GetApp from "@material-ui/icons/GetApp";
import "./InstallButton.css";

class InstallButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canInstall: null
    };
    this.addToHomeScreen = this.addToHomeScreen.bind(this);
  }
  componentDidMount() {
    window.addEventListener("beforeinstallprompt", event => {
      // Stash the event so it can be triggered later.
      this.setState({ canInstall: event });
    });
  }

  addToHomeScreen() {
    if (this.state.canInstall) {
      this.state.canInstall.prompt();
      // Wait for the user to respond to the prompt
      this.state.canInstall.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
          this.setState = {
            canInstall: null
          };
        } else {
          console.log("User dismissed the A2HS prompt");
        }
      });
    }
  }

  render() {
    return (
      <>
        {this.state.canInstall && (
          <Button
            id="install-button"
            variant="contained"
            onClick={() => this.addToHomeScreen()}
          >
            <GetApp></GetApp>&nbsp; Install
          </Button>
        )}
      </>
    );
  }
}

export default InstallButton;
