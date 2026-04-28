import React from 'react'
import {
    RadialBarChart,
    RadialBar,
    Legend,
    PolarRadiusAxis,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";
export default function SellerRadialBarChart() {
    const data = [
        {
            name: "18-24",
            uv: 18,
            pv: 2400,
            fill: "#8884d8",
        },
        {
            name: "25-29",
            uv: 26,
            pv: 4567,
            fill: "#83a6ed",
        },
        {
            name: "30-34",
            uv: 31,
            pv: 1398,
            fill: "#8dd1e1",
        },
        {
            name: "35-39",
            uv: 35.22,
            pv: 9800,
            fill: "#82ca9d",
        },
        {
            name: "40-49",
            uv: 45.63,
            pv: 3908,
            fill: "#a4de6c",
        },
        {
            name: "50+",
            uv: 51.63,
            pv: 4800,
            fill: "#d0ed57",
        }
    ];

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
                innerRadius="10%"
                outerRadius="80%"
                barSize={10}
                data={data}
            >
                <RadialBar
                    minAngle={15}
                    label={{ position: "insideStart", fill: "#fff" }}
                    background
                    clockWise
                    dataKey="uv"
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
