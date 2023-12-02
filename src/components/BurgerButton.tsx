import React from "react";
import { BurgerSvg } from "./Svg";

class BurgerButton extends React.Component<
  { show: boolean; handle: Function },
  { show: boolean; hover: boolean; profile: any | null }
> {
  constructor(props: { show: boolean; handle: Function }) {
    super(props);
    this.state = {
      show: props.show,
      hover: false,
      profile: null,
    };
  }

  toogle = (): void => {
    this.props.handle(!this.state.show);
  };

  render = (): React.ReactNode => {
    return (
      <div onClick={this.toogle} className="absolute right-0 top-0">
        <BurgerSvg className="fill-white/70 cursor-pointer" />
      </div>
    );
  };
}

export default BurgerButton;
