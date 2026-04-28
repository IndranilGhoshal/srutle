import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { faqsSchema, faqtopicsSchema } from "@/app/model/consumerModal";
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

        //GET FAQ
        if (payload.getfaq) {
            filter = { mstfaqtopicsid:payload.id, status: { $in: ['0'] } }
            let results = await faqsSchema.find(filter);
            if (results) {
                responsestatus = StatusCodes.FOUND
                result = results
                success = true
                message = "FAQ Details found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "FAQ Details not found"
            }
        }
        //GET FAQ Topic
        else if (payload.getfaqtopic) {
            filter = { status: { $in: ['0'] } }
            let results = await faqtopicsSchema.find(filter);
            if (results) {
                responsestatus = StatusCodes.FOUND
                result = results
                success = true
                message = "FAQ found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "FAQ not found"
            }
        }
        //GET FAQ Details
        else if (payload.getfaqdetails) {
            filter = { mstfaqtopicsid:payload.id, status: { $in: ['0'] } }
            let results = await faqsSchema.findOne(filter);
            if (results) {
                responsestatus = StatusCodes.FOUND
                result = results
                success = true
                message = "FAQ Details found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "FAQ Details not found"
            }
        }
        return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
    } catch (e) {
        return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}