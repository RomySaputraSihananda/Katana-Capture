import React from "react";

class SideBar extends React.Component<{ show: boolean }> {
  render = (): React.ReactNode => {
    return (
      <div
        className={`h-full w-full absolute left-0 ${
          this.props.show
            ? "transform visible backdrop-blur-sm"
            : "transform invisible"
        } duration-500 ease-linear`}
      >
        <div
          className={`h-full w-[30%] absolute backdrop-blur-md bg-black/40 left-0 ${
            this.props.show
              ? "transform translate-x-0 transition"
              : "transform -translate-x-full transition"
          } duration-500 ease-out`}
        >
          test
        </div>
      </div>
    );
  };
}

export default SideBar;
