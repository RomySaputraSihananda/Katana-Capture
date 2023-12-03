// import React from "react";

// class Cpus extends React.Component<{}, { data: number[] }> {
//   state = {
//     data: [],
//   };

//   componentDidMount(): void {
//     (async () => {
//       const num: number = await window.ipcRenderer.invoke("getCpus");

//       if (this.state.data.length === 10) this.state.data.shift();

//       this.setState({
//         data: [...this.state.data, num],
//       });
//     })();
//   }

//   componentDidUpdate(): void {
//     (async () => {
//       const num: number = await window.ipcRenderer.invoke("getCpus");

//       if (this.state.data.length === 10) this.state.data.shift();

//       this.setState({
//         data: [...this.state.data, num],
//       });
//     })();
//   }

//   render(): React.ReactNode {
//     const { data } = this.state;
//     return <div>{/* <h1>{data}</h1> */}</div>;
//   }
// }

// export default Cpus;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const buildData = (data: any) => {
  return {
    labels: [...Array(10).keys()],
    datasets: [
      {
        data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};

const Cpus = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const num: number = await window.ipcRenderer.invoke("getCpus");
      if (data.length === 100) data.shift();

      setData([...data, num]);
    })();
  });

  console.log(data);
  return (
    <Line
      options={{
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
      }}
      data={buildData(data)}
    />
  );
};

export default Cpus;
