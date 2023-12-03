import React from "react";

class Cpus extends React.Component<{}, { data: any | null }> {
  state = {
    data: null,
  };

  componentDidMount(): void {
    (async () => {
      this.setState({ data: await window.ipcRenderer.invoke("getCpus") });
    })();
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>ok</h1>
      </div>
    );
  }
}

export default Cpus;
