import React from "react";
import Snowfall from "react-snowfall";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { UploadSvg } from "./components/Svg";

class App extends React.Component<
  {},
  {
    field: {
      video: string;
      option: number;
    };
    show: boolean;
  }
> {
  state = {
    field: {
      video: "",
      option: 30,
    },
    show: false,
  };

  render = (): React.ReactNode => {
    const { field, show } = this.state;
    return (
      <div className="bg-black/20 h-screen bg-bg text-white filter brightness-80 relative">
        <Navbar
          show={show}
          handle={(show: boolean) => this.setState({ show })}
        />
        <Snowfall snowflakeCount={30} />
        <SideBar
          show={show}
          handle={(show: boolean) => this.setState({ show })}
        />
        <div className="h-full w-full grid place-items-center font-Quote ">
          <div className="backdrop-blur-xs bg-black/40 w-[60%] h-[50%] rounded-lg border border-white/20 drop-shadow-2xl flex flex-col">
            <div className="flex-1 flex items-center justify-center text-white hover:bg-white/10 transition duration-300">
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-center w-full h-full justify-center pt-5 pb-6">
                  {field.video ? (
                    <p className="mb-3 text-4xl tracking-widest">
                      {field.video.split("/").pop()}
                    </p>
                  ) : (
                    <>
                      <UploadSvg className="w-[50px] fill-none m-5" />
                      <p className="mb-3 text-4xl tracking-widest">
                        Click to upload
                      </p>
                      <p className="text-lg tracking-widest">
                        AVI, MP4, MPG, WEBM, MKV, GIFV, WMV
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={(e: any | null) =>
                    this.setState({
                      field: { ...field, video: e.target.files[0].path },
                    })
                  }
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex w-full">
              <select
                onChange={() => (e: any | null) =>
                  this.setState({
                    field: { ...field, option: e.target.value },
                  })}
                className="px-3 py-6 rounded-lg text-center outline-none bg-transparent hover:bg-white/10 transition duration-300"
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
              <select className="px-3 py-6 rounded-lg text-center outline-none bg-transparent hover:bg-white/10 transition duration-300">
                <option selected disabled>
                  Quality Image
                </option>
                {["SD", "HD"].map((e) => {
                  return (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  );
                })}
              </select>{" "}
              <select className="px-3 py-6 rounded-lg text-center outline-none bg-transparent hover:bg-white/10 transition duration-300">
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
              <button
                className="disabled:hover:bg-red-300/50 hover:bg-sky-400/50 flex-1 text-2xl tracking-widest transition duration-300"
                disabled={field.video ? false : true}
                onClick={() => window.ipcRenderer.invoke("gasConvert", field)}
              >
                Write !
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default App;
