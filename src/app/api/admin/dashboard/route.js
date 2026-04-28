import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { adminMenuSchema, adminRoleMenuSchema, adminRoleSchema, adminSchema, roleSchema } from "@/app/model/adminModel";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    let middeleware = await MiddlewareRequest()
    if (middeleware) {
        try {
            let payload = await request.json();
            let result;
            let success = false;
            let message;
            let listlength;
            let filter;
            let sortObj;
            let obj = {};
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });

            if (payload.getdashboarddata) {

                obj.totalrevenue = 0
                obj.pendingorders = 0
                obj.completedorders = 0

                result = obj
                success = true
            }

            else if (payload.getsalesperformance) {
                const data = [
                    {
                        name: 'Jan',
                        value: 500,
                    },
                    {
                        name: 'Feb',
                        value: 300,
                    },
                    {
                        name: 'Mar',
                        value: 600,
                    },
                    {
                        name: 'Apr',
                        value: 700,
                    },
                    {
                        name: 'May',
                        value: 900,
                    },
                    {
                        name: 'Jun',
                        value: 200,
                    },
                    {
                        name: 'July',
                        value: 1500,
                    },
                    {
                        name: 'Aug',
                        value: 1100,
                    },
                    {
                        name: 'Sep',
                        value: 800,
                    },
                    {
                        name: 'Oct',
                        value: 1500,
                    },
                    {
                        name: 'Nov',
                        value: 1000,
                    },
                    {
                        name: 'Dec',
                        value: 1300,
                    },
                ];
                result = data
                success = true
            }

            else if (payload.getconsumergenderinsights) {
                const data = [
                    { name: "Male", value: 60 },
                    { name: "Female", value: 40 },
                ];
                result = data
                success = true
            }

            else if (payload.getorderperformance) {
                const data = [
                    {
                        name: 'Jan',
                        value: 500,
                    },
                    {
                        name: 'Feb',
                        value: 300,
                    },
                    {
                        name: 'Mar',
                        value: 600,
                    },
                    {
                        name: 'Apr',
                        value: 700,
                    },
                    {
                        name: 'May',
                        value: 900,
                    },
                    {
                        name: 'Jun',
                        value: 200,
                    },
                    {
                        name: 'July',
                        value: 1500,
                    },
                    {
                        name: 'Aug',
                        value: 1100,
                    },
                    {
                        name: 'Sep',
                        value: 800,
                    },
                    {
                        name: 'Oct',
                        value: 1500,
                    },
                    {
                        name: 'Nov',
                        value: 1000,
                    },
                    {
                        name: 'Dec',
                        value: 1300,
                    },
                ];
                result = data
                success = true
            }

            else if (payload.getconsumerinsights) {
                const data = [
                    {
                        name: "18-30",
                        value: 50,
                        fill: "#8884d8",
                    },
                    {
                        name: "31-50",
                        value: 20,
                        fill: "#83a6ed",
                    },
                    {
                        name: "50+",
                        value: 10,
                        fill: "#8dd1e1",
                    },
                ];
                result = data
                success = true
            }

            return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}
