import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function SellerLineChart() {
  const data = [
          {
              name: 'Page A',
              uv: 500,
              amt: 2400,
          },
          {
              name: 'Page B',
              uv: 3000,
              amt: 2210,
          },
          {
              name: 'Page C',
              uv: 2000,
              amt: 2290,
          },
          {
              name: 'Page D',
              uv: 2780,
              amt: 2000,
          },
          {
              name: 'Page E',
              uv: 1890,
              amt: 2181,
          },
          {
              name: 'Page F',
              uv: 2390,
              amt: 2500,
          },
          {
              name: 'Page G',
              uv: 3490,
              amt: 2100,
          },
      ];
      return (
          <>
              <LineChart
                  width={600}
                  height={400}
                  data={data}
                  margin={{
                      top: 10,
                      right: 5,
                      left: 5,
                      bottom: 5,
                  }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                  <YAxis />
                  <Tooltip />
                  <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
          </>
      )
}
