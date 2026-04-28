import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { StatusCodes } from "../../_apiFunction/StatusCode";
import { MiddlewareRequest } from "../../_apiFunction/Middleware";
import { adminEventSchema } from "@/app/model/eventModel";

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
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });
            //List
            if (payload.list) {

                filter = { mstAdminId: { $regex: new RegExp(payload.id, 'i') }, status: { $in: ['0'] } };

                sortObj = {}

                let len = await adminEventSchema.find(filter)
                listlength = len.length

                let results = await adminEventSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

                if (results.length > 0) {
                    result = results
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                    message = "Activity Logs Found"
                } else {
                    responsestatus = StatusCodes.NO_CONTENT
                    success = false
                    message = "Activity Logs Not Found"
                }
                // ------------List End------------ //
            }
            return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}