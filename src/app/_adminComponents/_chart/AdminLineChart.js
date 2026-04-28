'use client'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function AdminLineChart({salesperformance}) {
    return (
        <>
            <LineChart
                width={550}
                height={400}
                data={salesperformance}
                margin={{
                    top: 10,
                    right: 5,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </>
    )
}
