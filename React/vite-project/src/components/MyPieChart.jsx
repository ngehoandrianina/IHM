import React from 'react'
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA55CC'];
const MyPieChart = ({data}) => {

  
  // Regrouper par type
  const typeCounts = data.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  
  // Convertir en tableau pour le PieChart
  const chartData = Object.entries(typeCounts).map(([type, count]) => ({
    name: type,
    value: count,
  }));
  return (
    <div className="w-full h-64">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
  )
}

export default MyPieChart