import React from "react";
import Snowfall from "react-snowfall";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { UploadSvg } from "./components/Svg";
import Loading from "./components/Loading";

class App extends React.Component<
  {},
  {
    field: {
      video: string;
      option: number;
    };
    show: boolean;
    loading: boolean;
    drag: boolean;
  }
> {
  state = {
    field: {
      video: "",
      option: 30,
    },
    show: false,
    loading: false,
    drag: false,
  };

  handleConvert = async () => {
    this.setState({ loading: true });
    await window.ipcRenderer.invoke("gasConvert", this.state.field);
    this.setState({
      field: {
        video: "",
        option: 30,
      },
      loading: false,
    });
  };

  render = (): React.ReactNode => {
    const { field, show, loading, drag } = this.state;

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
        {loading && <Loading />}
        <div className="h-full w-full grid place-items-center font-Quote ">
          <div className="backdrop-blur-xs bg-black/40 w-[60%] h-[50%] rounded-lg border border-white/20 drop-shadow-2xl flex flex-col">
            <div
              className={`${
                drag && "bg-white/10"
              } flex-1 flex items-center justify-center text-white hover:bg-white/10 transition duration-300`}
            >
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer"
              >
                <div
                  onDrop={(e: any | null) => {
                    e.preventDefault();
                    this.setState({
                      field: { ...field, video: e.dataTransfer.files[0].path },
                    });
                    this.setState({ drag: false });
                  }}
                  onDragOver={(e: any | null) => {
                    e.preventDefault();
                    this.setState({ drag: true });
                  }}
                  className="flex flex-col items-center w-full h-full justify-center pt-5 pb-6"
                >
                  {field.video ? (
                    <p className="mb-3 text-4xl tracking-widest">
                      {field.video.split("/").pop()}
                    </p>
                  ) : (
                    <>
                      <UploadSvg className="w-[50px] fill-none m-5" />
                      <p className="mb-3 text-4xl tracking-widest">
                        Click or Drop to upload
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

            <div className="flex w-full border-t border-white/20 rounded-t-lg">
              <select
                onChange={() => (e: any | null) =>
                  this.setState({
                    field: { ...field, option: e.target.value },
                  })}
                className="block appearance-none px-3 py-6 text-xl rounded-lg text-center outline-none bg-transparent hover:bg-white/10 transition duration-300"
              >
                <option selected disabled className="bg-black text-white">
                  Frame Per Second
                </option>
                {[15, 30, 60, 120].map((e) => {
                  return (
                    <option value={e} key={e} className="bg-black text-white">
                      {e} fps
                    </option>
                  );
                })}
              </select>
              <select className="px-3 py-6 rounded-lg text-xl appearance-none bg-transparent text-center outline-none hover:bg-white/10 transition duration-300">
                <option selected disabled className="bg-black text-white">
                  Image Quality
                </option>
                {["SD", "HD"].map((e) => {
                  return (
                    <option value={e} key={e} className="bg-black text-white">
                      {e}
                    </option>
                  );
                })}
              </select>
              <select
                disabled
                className="px-3 py-6 rounded-lg text-xl text-center outline-none bg-transparent hover:bg-white/10 transition duration-300"
              >
                <option selected disabled>
                  Next Feature ?
                </option>
              </select>
              <button
                className="disabled:hover:bg-red-600/10 hover:bg-sky-600/10 rounded-lg flex-1 text-2xl tracking-widest transition duration-300"
                disabled={field.video ? false : true}
                onClick={this.handleConvert}
              >
                Convert !
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default App;
