import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { tutorialsSchema } from "@/app/model/adminModel";
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
            let responsestatus;
            await mongoose.connect(connectionStr, { useNewUrlParser: true });
            
            //Add Tutorial
            if (payload.addtutorial) {
                let results = await tutorialsSchema.findOne({ title: payload.title, status: { $in: ['0', '1'] } })
                if (!results) {
                    let Obj = {
                        url: payload.url,
                        title: payload.title,
                        description: payload.description,
                        status: payload.status
                    }
                    const res = new tutorialsSchema(Obj);
                    let r = await res.save()
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Add Tutorial Successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "Tutorial Already exist"
                }
            }
            //Tutorial List
            else if (payload.tutoriallist) {

                // ------------Filter Start------------ //
                // search
                if (payload.search) {
                    filter = { title: { $regex: new RegExp(payload.search, 'i') }, status: { $in: ['0', '1'] } }
                }
                //deault
                else {
                    filter = { status: { $in: ['0', '1'] } };
                }
                // ------------Filter End------------ //

                // ------------Sort Start------------ //
                sortObj = {}
                // ------------Sort End------------ //

                // ------------List Length Start------------ //
                let len = await tutorialsSchema.find(filter)
                listlength = len.length
                // ------------List Length End------------ //

                // ------------List Start------------ //
                let results = await tutorialsSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

                if (results.length > 0) {
                    responsestatus = StatusCodes.SUCCESS
                    result = results
                    success = true
                    message = "Tutorial found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Tutorial not found"
                }
                // ------------List End------------ //
            }
            //Tutorial Edit
            else if (payload.edittutorial) {
                let res = await tutorialsSchema.findOne({ title: payload.title })
                if (!res) {
                    let Obj = {
                        url: payload.url,
                        title: payload.title,
                        description: payload.description,
                        status: payload.status
                    }
                    result = await tutorialsSchema.findOneAndUpdate({ _id: payload.id }, Obj)
                    if (result) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true
                        message = "Tutorial update successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false
                        message = "Tutorial not update successfully"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "Tutorial Already exist"
                }
            }
            //Tutorial Status
            else if (payload.onStatus) {
                result = await tutorialsSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
                if (result) {
                    if (payload.status == "2") {
                        message = "Tutorial delete successfully"
                    } else if (payload.status == "1") {
                        message = "Tutorial inactive successfully"
                    } else {
                        message = "Tutorial active successfully"
                    }
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Tutorial not found"
                }
            }


            return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
        } catch (e) {
            return NextResponse.json({ result: null, success: false, status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
        }
    } else {
        return NextResponse.json({ result: null, success: false, status: StatusCodes.Unauthorized, error: 1 })
    }
}
