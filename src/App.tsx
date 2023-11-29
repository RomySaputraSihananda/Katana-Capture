import React from "react";
import Snowfall from "react-snowfall";

class App extends React.Component {
  state = {
    input: null,
    video: null,
  };

  render = (): React.ReactNode => {
    return (
      <div className="h-screen bg-black text-white grid place-items-center relative">
        <Snowfall />
        <div className="bg-[#0CF167] h-[20%] w-screen absolute top-0 rounded-b-full"></div>
        <div>
          <input
            type="file"
            name="video"
            accept="video/mp4,video/x-m4v,video/*"
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
    );
  };
}

export default App;
