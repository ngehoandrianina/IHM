import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { mois: 'Jan', pannes: 2 },
    { mois: 'Fév', pannes: 5 },
    { mois: 'Mar', pannes: 3 },
    { mois: 'Avr', pannes: 4 },
    { mois: 'Mai', pannes: 6 },
    { mois: 'Juin', pannes: 1 },
  ];

const MyLineChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pannes" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>

  )
}

export default MyLineChart