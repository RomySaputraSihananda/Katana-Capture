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

    return (
      <>
        {data && (
          <nav className="absolute top-0 flex items-center justify-between backdrop-blur-xs bg-black/40 w-full border-b border-white/20">
            <div className="flex items-center">
              <BurgerButton show={show} handle={this.toogle} />
              <a
                href="https://github.com/romysaputrasihananda/Katana-Capture"
                target="blank"
              >
                <h1 className="ml-4 text-5xl font-Kashima tracking-widest text-[#fff]">
                  Katana Capture
                </h1>
              </a>
            </div>
            <h1 className="text-3xl mx-10 tracking-wider font-Quote">
              Hello, {data["userInfo"]["username"]}@{data["hostname"]}
            </h1>
          </nav>
        )}
      </>
    );
  }
}

export default Navbar;
