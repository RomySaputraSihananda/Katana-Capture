import React from "react";
import CloseButton from "./CloseButton";

class InputUsername extends React.Component<
  { handle: Function; input: Function },
  { username: string }
> {
  constructor(props: { handle: Function; input: Function }) {
    super(props);
    this.state = {
      username: "",
    };
  }
  render(): React.ReactNode {
    const { username } = this.state;

    return (
      <div
        className={`w-screen h-screen absolute bg-black/80 grid place-items-center z-10`}
      >
        <div>
          <h1>Input Your Github Username</h1>
          <input
            type="text"
            name=""
            className="bg-black text-white"
            onChange={(e) => this.setState({ username: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this.props.handle(username)}
          />
        </div>
        <CloseButton toogle={() => this.props.input(false)} />
      </div>
    );
  }
}

export default InputUsername;
