import React from "react";
import { BurgerSvg } from "./Svg";

class BurgerButton extends React.Component<
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
    const { show, hover } = this.state;
    return (
      <div
        onClick={this.toogle}
        className={`cursor-pointer p-1 rounded-md m-2 bg-black/70 hover:bg-white/70 transition ${
          !show ? "transform visible" : "transform invisible"
        } ease-linear duration-300`}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <BurgerSvg className={hover ? "fill-black" : "fill-white"} />
      </div>
    );
  };
}

export default BurgerButton;
