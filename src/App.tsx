import React from "react";
import Snowfall from "react-snowfall";
import SideBar from "./components/SideBar";

class App extends React.Component {
  state = {
    video: null,
    show: false,
  };

  render = (): React.ReactNode => {
    const { video, show } = this.state;
    return (
      <div className="h-screen bg-bg text-white filter brightness-80 relative">
        <Snowfall snowflakeCount={30} />
        <SideBar
          show={show}
          handle={(show: boolean) => this.setState({ show })}
        />
        <div className={`h-full w-full grid place-items-center`}>
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
        </div>
        <button
          className="absolute top-0 right-0"
          onClick={() => this.setState({ show: !show })}
        >
          Test
        </button>
      </div>
    );
  };
}

export default App;
