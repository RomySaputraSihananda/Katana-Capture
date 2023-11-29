import React from "react";
class App extends React.Component {
  state = {
    input: null,
    video: null,
  };

  render = (): React.ReactNode => {
    return (
      <div className="h-screen bg-black text-white grid place-items-center relative">
        <div className="bg-[#0CF167] h-[20%] w-screen absolute top-0 rounded-b-full sha"></div>
        <div>
          <h1>Hello World !</h1>
          <input
            type="text"
            className="bg-white text-black"
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          {/* <button onClick={() => window.readSettings(this.state.input)}>
            Meee
          </button> */}
        </div>
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
