import React from "react";
import Snowfall from "react-snowfall";

class App extends React.Component {
  state = {
    video: null,
    sideBar: false,
  };

  render = (): React.ReactNode => {
    const { video, sideBar } = this.state;
    return (
      <div className="h-screen bg-bg text-white">
        <Snowfall snowflakeCount={30} />
        <div
          className={`h-full w-full grid place-items-center relative ${
            sideBar
              ? "transform backdrop-blur-lg"
              : "transform backdrop-blur-xs"
          } duration-500 ease-out`}
        >
          <div>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={(e: any | null) =>
                this.setState({ video: e.target.files[0].path })
              }
            />
            {this.state.video && (
              <button
                onClick={() => window.ipcRenderer.invoke("gasConvert", video)}
              >
                Write !
              </button>
            )}
          </div>
          <button
            className="absolute top-0 right-0"
            onClick={() => this.setState({ sideBar: !sideBar })}
          >
            Test
          </button>
          <div
            className={`h-full w-[30%] absolute bg-black left-0 ${
              sideBar
                ? "transform translate-x-0 transition"
                : "transform -translate-x-full transition"
            } duration-500 ease-out`}
          >
            test
          </div>
        </div>
      </div>
    );
  };
}

export default App;
