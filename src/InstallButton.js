import React, { Component } from "react";
import { Button } from "@material-ui/core";
import GetApp from "@material-ui/icons/GetApp";

class InstallButton extends Component {
  addToHomeScreen() {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      window.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
          window.deferredPrompt = null;
        } else {
          console.log("User dismissed the A2HS prompt");
        }
      });
    }
  }

  render() {
    return (
      <Button variant="contained" onClick={() => this.addToHomeScreen()}>
        <GetApp></GetApp>&nbsp; Install
      </Button>
    );
  }
}

export default InstallButton;
