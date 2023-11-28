import React from "react";
class App extends React.Component {
  state = {
    input: "",
    video: "",
  };

  handlePreview = (e: any) => {
    this.setState({ video: e.target.files[0].path });
  };

  render = (): React.ReactNode => {
    return (
      <div className="h-screen bg-black text-white grid place-items-center">
        <div>
          <h1>Hello World !</h1>
          <input
            type="text"
            className="bg-white text-black"
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          <button onClick={() => window.readSettings(this.state.input)}>
            Write !
          </button>
        </div>
        <div>
          <input
            type="file"
            name="video"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={this.handlePreview.bind(this)}
          />
          <button onClick={() => window.gasConvert(this.state.video)}>
            Write !
          </button>
        </div>
      </div>
    );
  };
}

export default App;
