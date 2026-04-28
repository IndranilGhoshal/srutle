import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { categorySchema } from "@/app/model/adminModel";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    try {
        let payload = await request.json();
        let result;
        let success = false;
        let message;
        let listlength;
        let responsestatus;

        await mongoose.connect(connectionStr, { useNewUrlParser: true });

        // Category List
        if (payload.list) {
            // ------------List Start------------ //
            result = await categorySchema.find({ status: { $in: ['0'] } });
            if (result.length > 0) {
                responsestatus = StatusCodes.FOUND
                success = true
                message = "Category found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                success = false
                message = "Category not found"
            }
            // ------------List End------------ //
        } 
        // Category Details
        else if (payload.details) {
            result = await categorySchema.findOne({ _id: payload.mstcategoryid, status: { $in: ['0'] } });
            if (result) {
                responsestatus = StatusCodes.FOUND
                success = true
                message = "Category found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                success = false
                message = "Category not found"
            }
        }

        return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
        
    } catch (e) {
        return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}