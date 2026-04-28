import React from 'react'
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default function AdminBarChart({orderperformance}) {

    return (
        <>
            <ComposedChart
                width={550}
                height={300}
                data={orderperformance}
                margin={{
                    top: 10,
                    right: 5,
                    bottom: 5,
                    left: 0
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </ComposedChart>
        </>
    )
}
