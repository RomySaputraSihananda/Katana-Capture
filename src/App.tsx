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
          <div className="bg-white/30 backdrop-blur-md">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <select
              onChange={() => (e: any | null) =>
                this.setState({ field: { ...field, option: e.target.value } })}
              className="text-black px-1 py-2 rounded-lg text-center outline-none bg-transparent"
            >
              <option selected disabled>
                Frame Per Second
              </option>
              {[15, 30, 60, 120].map((e) => {
                return (
                  <option value={e} key={e}>
                    {e} fps
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
                onClick={() => window.ipcRenderer.invoke("gasConvert", field)}
                // onClick={() => window.ipcRenderer.invoke("quetion-profile")}
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
