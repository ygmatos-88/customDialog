import React from "react";

import AlertDialog from "./AlertDialog";

class Home extends React.Component {
  state = {
    input: "",
    showDialog: false
  };
  componentDidMount() {
    this.block = this.props.history.block(this.onBlock);
  }

  componentWillUnmount() {
    this.block && this.block();
  }

  handleInputChange = (e) => this.setState({ input: e.target.value });

  onBlock = (tx) => {
    this.navigation = () => this.props.history.push(tx.pathname);
    if (this.state.input.length > 0 && !this.state.showDialog) {
      this.setState({ showDialog: true });
    }
    if (this.state.input.length === 0 || this.state.showDialog) {
      this.block();
      return true;
    }
    return false;
  };

  onDiscardClick = () => {
    console.log("This will stay here");
    this.setState({ showDialog: false });
  };

  onMoveToNextClick = () => {
    //Here you can save data or whatever action required

    //Resume blocking
    this.block && this.block();
    //Redirect to user where they want to go
    this.navigation && this.navigation();
  };

  render() {
    // console.log("m", this.block);
    return (
      <div>
        Hello
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInputChange}
        />
        <p>
          {this.state.input.length > 0
            ? "Something change. It will block your route. Try switching to another route"
            : "Type something to block the route"}
        </p>
        <AlertDialog
          isOpen={this.state.showDialog}
          moveToNextRoute={this.onMoveToNextClick}
          onDiscardClick={this.onDiscardClick}
        />
      </div>
    );
  }
}

export default Home;
