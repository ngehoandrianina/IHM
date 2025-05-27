import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  

const MyLineChart = ({data}) => {


  const marqueCounts = data.reduce((acc, item) => {
    acc[item.marque] = (acc[item.marque] || 0) + 1;
    return acc;
  }, {});
  
  const lineChartData = Object.entries(marqueCounts).map(([marque, count]) => ({
    marque,
    count,
  }));
  return (
    <div className="w-full h-60 ">
      <ResponsiveContainer width="100%" height="100%" >
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="marque" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
    </div>

  )
}

export default MyLineChart