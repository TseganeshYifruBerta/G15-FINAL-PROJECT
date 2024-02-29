import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis } from "recharts";

import dynamic from 'next/dynamic'
 


const data = [
  { name: "monday", submitted: 12 },
  { name: "tuesday", submitted: 13 },
  { name: "wednesday", submitted: 30 },
  { name: "thursday", submitted: 49 },
  { name: "friday", submitted: 10 },
  { name: "saturday", submitted: 22 },
  { name: "sunday", submitted: 90 },
];

const Chart1 = () => {
  return (
    <div>
       
      <div >
        <span >Question Submissions</span>
        <span>---Daily</span>
      </div>
      <LineChart width={400}     height = {300} data={data}>
        <Line type="monotone" dataKey="submitted" stroke="#FFA500" strokeWidth={3} />
        <CartesianGrid strokeDasharray="3 3" className="chartgrid" />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};
export default Chart1;