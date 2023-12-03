import React from "react";

class Navbar extends React.Component {
  state = {
    os: "",
  };
  componentDidMount = (): void => {
    (async () => {
      this.setState({ os: await window.ipcRenderer.invoke("getOs") });
    })();
  };

  render(): React.ReactNode {
    return (
      <nav>
        <h1>{this.state.os}</h1>
      </nav>
    );
  }
}

export default Navbar;
