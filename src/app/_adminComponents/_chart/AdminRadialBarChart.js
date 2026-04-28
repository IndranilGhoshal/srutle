import React from 'react'
import {
    RadialBarChart,
    RadialBar,
    Legend,
    PolarRadiusAxis,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";
export default function AdminRadialBarChart({consumerinsights}) {
    

    const style = {
        top: 0,
        left: 320,
        lineHeight: "24px",
    };
    return (
        <>
            <RadialBarChart
                width={400}
                height={300}
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="100%"
                barSize={20}
                data={consumerinsights}
            >
                <RadialBar
                    minAngle={15}
                    label={{ position: "insideStart", fill: "#fff" }}
                    background
                    clockWise
                    dataKey="value"
                />
                <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={style}
                />
            </RadialBarChart>
        </>
    )
}
