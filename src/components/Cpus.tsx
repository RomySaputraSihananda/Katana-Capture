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

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{ data: any | null }>,
    snapshot?: any
  ): void {
    (async () => {
      this.setState({ data: await window.ipcRenderer.invoke("getCpus") });
    })();
  }

  render(): React.ReactNode {
    const { data } = this.state;
    return (
      <div>
        <h1>{data}</h1>
      </div>
    );
  }
}

export default Cpus;
