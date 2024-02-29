import {CartesianGrid,Legend,Line, LineChart, Tooltip,XAxis} from "recharts";

const data = [
  {name: "monday",collected:82} ,{name:"tuesday", collected:13} , {name:"wednesday",collected:30}, {name:"thursday",collected: 49}, {name:"friday",collected:20 }, {name:"saturday",collected: 92}, {name:"sunday",collected: 40},
]
  

const Chart2 = () => {
  return (<div>
    <div  >
        <span>Question Solved</span>

        <span>---Daily</span>
    </div>
    <LineChart width={300}     height = {300} data = {data}>
      <Line type= "monotone" dataKey ="collected" stroke="#2F4D2A" strokeWidth= {3}/>
      <CartesianGrid strokeDasharray = "3 3" className = "chartgrid"/>
      <XAxis dataKey="name"/>
      
      <Tooltip/>
      <Legend/>
    </LineChart>
    </div>
  )
}
export default Chart2;