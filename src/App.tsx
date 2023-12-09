import React from "react";
import Snowfall from "react-snowfall";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";

class App extends React.Component {
  state = {
    field: {
      video: null,
      option: 30,
    },
    show: false,
  };

  render = (): React.ReactNode => {
    const { field, show } = this.state;
    return (
      <div className="h-screen bg-bg text-white filter brightness-80 relative">
        <Navbar
          show={show}
          handle={(show: boolean) => this.setState({ show })}
        />
        <Snowfall snowflakeCount={30} />
        <SideBar
          show={show}
          handle={(show: boolean) => this.setState({ show })}
        />
        <div className={`h-full w-full grid place-items-center`}>
          <div>
            <select
              defaultValue={30}
              onChange={() => (e: any | null) =>
                this.setState({ field: { ...field, option: e.target.value } })}
              className="text-black"
            >
              {[15, 30, 60, 120].map((e) => {
                return (
                  <option value={e} key={e}>
                    {e}
                  </option>
                );
              })}
            </select>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={(e: any | null) =>
                this.setState({
                  field: { ...field, video: e.target.files[0].path },
                })
              }
            />
            {field.video && (
              <button
                // onClick={() => window.ipcRenderer.invoke("gasConvert", field)}
                onClick={() => window.ipcRenderer.invoke("quetion-profile")}
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
