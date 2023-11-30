import React from "react";
import { Katana } from "./Svg";

class SideBar extends React.Component<
  { show: boolean; handle: Function },
  { show: boolean; hover: boolean }
> {
  constructor(props: { show: boolean; handle: Function }) {
    super(props);
    this.state = {
      show: props.show,
      hover: false,
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
        className={`h-full w-full absolute left-0 flex ${
          show ? "transform visible backdrop-blur-sm" : "transform invisible"
        } duration-500 ease-linear`}
        onClick={this.toogle}
      >
        <div
          className={`h-full w-[40%] backdrop-blur-md bg-black/40 relative ${
            show
              ? "transform translate-x-0 transition"
              : "transform -translate-x-full transition"
          } duration-500 ease-out`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute top-0 right-0 cursor-pointer p-1 rounded-full m-2 bg-black/70 hover:bg-white/70 transition duration-500 ease-out"
            onClick={this.toogle}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
          >
            <Katana
              className={this.state.hover ? "fill-black" : "fill-white"}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default SideBar;
