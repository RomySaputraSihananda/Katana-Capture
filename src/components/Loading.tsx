import React from "react";
import loading from "../assets/loading.gif";

class Loading extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="w-screen h-screen absolute bg-black/50 grid place-items-center z-30">
        <div className="w-full text-center">
          <p className="text-5xl">Please Wait...</p>
          <img src={loading} className="m-auto" />
        </div>
      </div>
    );
  }
}

export default Loading;
