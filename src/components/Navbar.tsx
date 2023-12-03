import React from "react";

class Navbar extends React.Component<{}, { data: any | null }> {
  state = {
    data: null,
  };
  componentDidMount = (): void => {
    (async () => {
      this.setState({ data: await window.ipcRenderer.invoke("getOs") });
    })();
  };

  render(): React.ReactNode {
    const { data } = this.state;
    console.log(data);
    return (
      <>
        {data && (
          <nav className="p-4">
            <h1>
              {data["userInfo"]["username"]}@{data["hostname"]}-
              {data["netInterface"]["wlo1"][0]["address"]}:
              {data["netInterface"]["wlo1"][0]["mac"]}
            </h1>
          </nav>
        )}
      </>
    );
  }
}

export default Navbar;
