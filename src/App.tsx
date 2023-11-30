import React from "react";
import Snowfall from "react-snowfall";
import SideBar from "./components/SideBar";
import { BurgerSvg } from "./components/Svg";

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
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
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
                onClick={() => window.ipcRenderer.invoke("gasConvert", field)}
              >
                Write !
              </button>
            )}
          </div>
        </div>
        <BurgerSvg
          className="absolute top-0 right-0 fill-white cursor-pointer"
          onClick={() => this.setState({ show: !show })}
        />
      </div>
    );
  };
}

export default App;
