import React from "react";
import Snowfall from "react-snowfall";

class App extends React.Component {
  state = {
    input: null,
    video: null,
  };

  render = (): React.ReactNode => {
    return (
      <div className="h-screen bg-bg bg-repeat text-white">
        <Snowfall snowflakeCount={30} />
        <div className="h-full w-full backdrop-blur-xs  grid place-items-center relative">
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
                onClick={() =>
                  window.ipcRenderer.invoke("gasConvert", this.state.video)
                }
              >
                Write !
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
}

export default App;
