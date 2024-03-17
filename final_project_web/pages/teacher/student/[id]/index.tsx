import React from "react";
import Header from "@/components/navbar/navbar";
import Widget from "@/components/widget/card";
import dynamic from "next/dynamic";
import NavigationTeacher from "@/components/layout/NavigationTeacher";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { FaChartPie } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { FaRegQuestionCircle, FaUsers, FaChartLine } from "react-icons/fa";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Questions Solved",
      data: [12, 19, 3, 5, 2, 3, 9],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};
const sectionData = {
  labels: ["Section A", "Section B", "Section C", "Section D"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5], // Example data
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
const SideNavbar = dynamic(() => import("@/components/sidebar/sidebar"), {
  ssr: false,
});
const Chart2 = dynamic(() => import("@/components/chart/chart"), {
  ssr: false,
});
const Chart1 = dynamic(() => import("@/components/chart/barchart"), {
  ssr: false,
});

const AdminPage: React.FC = () => {
  return (
    // <div className="flex w-full">
    //   <div className="w-full">
    //     <main className=" min-h-screen ">
    //       <div className="flex">
    //         <div className="flex flex-col flex-grow">
    //           <Header></Header>

    //           <div className="flex flex-row justify-center items-center w-4/5 mb-8 mt-4 mx-auto gap-4">
    //             <div className="relative z-10 w-1/2">
    //               <Widget type="user" />
    //             </div>
    //             <div className="relative z-10 w-1/2">
    //               <Widget type="agent" />
    //             </div>
    //             <div className="relative z-10 w-1/2">
    //               <Widget type="form" />
    //             </div>
    //           </div>
    //           <div className="flex flex-row justify-center items-center mt-4 gap-4">
    //             <div className="flex justify-center">
    //               {" "}
    //               {/* Added justify-center */}
    //               <Chart1 />
    //             </div>
    //             <div className="flex justify-center">
    //               {" "}
    //               {/* Added justify-center */}
    //               <Chart2 />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <div className="p-4 md:p-8 bg-white">
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        {/* Total Questions Solved */}
        <div className="bg-white rounded-lg shadow p-4 col-span-3 lg:col-span-1">
          <h2 className="font-semibold text-xl mb-4">
            <FaRegQuestionCircle className="inline mr-2" />
            Total Questions Solved
          </h2>
          <div className="text-3xl">120</div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="bg-white rounded-lg shadow p-4 col-span-3 lg:col-span-2 flex justify-around">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: "green" }}>
              Easy
            </div>
            <div className="text-gray-600">80 Solved</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: "orange" }}>
              Medium
            </div>
            <div className="text-gray-600">30 Solved</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: "red" }}>
              Hard
            </div>
            <div className="text-gray-600">10 Solved</div>
          </div>
        </div>
      </div>

      {/* Row for Charts */}
      <div className="grid gap-4 md:gap-8 mt-8 lg:grid-cols-3">
        {/* Line Chart */}
        <div
          className="bg-white rounded-lg shadow p-4 lg:col-span-2"
          style={{ height: "400px" }}
        >
          <h2 className="font-semibold text-xl mb-4">
            <FaChartLine className="inline mr-2" />
            Daily Activities
          </h2>
          <Line data={data} options={options} />
        </div>

        {/* Pie Chart */}
        <div
          className="bg-white rounded-lg shadow p-4 lg:col-span-1"
          style={{ height: "400px" }}
        >
          <h2 className="font-semibold text-xl mb-4 flex items-center">
            <FaChartPie className="mr-2" />
            Solutions by Section
          </h2>
          <Pie data={sectionData} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
