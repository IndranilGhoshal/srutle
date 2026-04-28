import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { tutorialsSchema } from "@/app/model/consumerModal";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    try {
        let payload = await request.json();
        let result;
        let success = false;
        let message;
        let listlength;
        let filter;
        let responsestatus;

        await mongoose.connect(connectionStr, { useNewUrlParser: true });

        //GET Tutorial
        if (payload.gettutorial) {
            filter = { status: { $in: ['0'] } }
            let results = await tutorialsSchema.find(filter);
            if (results) {
                responsestatus = StatusCodes.FOUND
                result = results
                success = true
                message = "Tutorial found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "Tutorial not found"
            }
        }

        return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
    } catch (e) {
        return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}