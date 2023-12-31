import React from "react";
import CloseButton from "./CloseButton";
import Profile from "./Profile";

class SideBar extends React.Component<
  { show: boolean; handle: Function },
  { show: boolean }
> {
  constructor(props: { show: boolean; handle: Function }) {
    super(props);
    this.state = {
      show: props.show,
    };
  }

  componentDidUpdate = (props: { show: boolean }): void => {
    if (props.show !== this.props.show)
      this.setState({ show: this.props.show });
  };

  toogle = (): void => {
    this.props.handle(!this.state.show);
  };

  render = (): React.ReactNode => {
    const { show } = this.state;

    return (
      <div
        className={`h-full w-full absolute left-0 flex z-10 ${
          show ? "transform visible backdrop-blur-sm" : "transform invisible"
        } duration-500 ease-linear`}
        onClick={this.toogle}
      >
        <div
          className={`h-full w-[40%] backdrop-blur-md bg-black/80 relative ${
            show
              ? "transform translate-x-0 transition"
              : "transform -translate-x-full transition"
          } duration-500 ease-out`}
          onClick={(e) => e.stopPropagation()}
        >
          <Profile />
          <CloseButton toogle={this.toogle} />
        </div>
      </div>
    );
  };
}

export default SideBar;
