import React from "react";
import CloseButton from "./CloseButton";
import { GithubSvg } from "./Svg";

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
        <div className="flex flex-col justify-center">
          <GithubSvg className="h-[300px] w-[300px] m-auto" />
          <h1 className="p-4 text-3xl">Input Your Github Username</h1>
          <input
            type="text"
            name=""
            className="backdrop-blur-sm text-xl text-center px-3 bg-white/10 rounded-lg text-white focus:outline-none h-10"
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
