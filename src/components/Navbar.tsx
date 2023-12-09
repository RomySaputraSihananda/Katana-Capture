import React from "react";
import BurgerButton from "./BurgerButton";

class Navbar extends React.Component<
  { show: boolean; handle: Function },
  { show: boolean; data: any | null }
> {
  constructor(props: { show: boolean; handle: Function }) {
    super(props);
    this.state = {
      show: props.show,
      data: null,
    };
  }

  componentDidMount = (): void => {
    (async () => {
      this.setState({ data: await window.ipcRenderer.invoke("getOs") });
    })();
  };

  componentDidUpdate = (props: { show: boolean }): void => {
    if (props.show !== this.props.show)
      this.setState({ show: this.props.show });
  };

  toogle = (): void => {
    this.props.handle(!this.state.show);
  };

  render(): React.ReactNode {
    const { data, show } = this.state;
    console.log(data);
    return (
      <>
        {data && (
          <nav className="absolute top-0 flex items-center backdrop-blur-xs bg-black/40 w-full">
            <BurgerButton show={show} handle={this.toogle} />
            <h1 className="text-2xl font-Spartan">
              Hello,{data["userInfo"]["username"]}@{data["hostname"]}👋
            </h1>
            <h1>ip:{data["netInterface"]["wlo1"][0]["address"]}</h1>
            <h1>mac:{data["netInterface"]["wlo1"][0]["mac"]}</h1>
          </nav>
        )}
      </>
    );
  }
}

export default Navbar;
