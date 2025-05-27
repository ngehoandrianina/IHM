import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
const MyBarChart = ({data}) => {
  
  
  const etatCounts = data.reduce((acc, item) => {
    acc[item.etat] = (acc[item.etat] || 0) + 1;
    return acc;
  }, {});
  
  const barChartData = Object.entries(etatCounts).map(([etat, count]) => ({
    etat,
    count,
  }));
  return (
    <div className="w-full h-60">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='etat' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" barSize={25}/>
      </BarChart>
    </ResponsiveContainer>
  </div>
  )
}

export default MyBarChart