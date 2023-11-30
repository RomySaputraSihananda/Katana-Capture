import React from "react";
import { KatanaSvg } from "./Svg";

class CloseButton extends React.Component<
  { hover: boolean; toogle: Function },
  { hover: boolean }
> {
  constructor(props: { hover: boolean; toogle: Function }) {
    super(props);
    this.state = {
      hover: props.hover,
    };
  }

  toogle = (): void => {
    this.props.toogle(!this.state.hover);
  };

  render = (): React.ReactNode => {
    const { hover } = this.state;
    return (
      <div
        className="absolute top-0 right-0 cursor-pointer p-1 rounded-full m-2 bg-black/70 hover:bg-white/70 transition duration-500 ease-out"
        onClick={this.toogle}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <KatanaSvg className={hover ? "fill-black" : "fill-white"} />
      </div>
    );
  };
}

export default CloseButton;
