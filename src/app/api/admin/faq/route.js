import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { faqsSchema, faqtopicsSchema } from "@/app/model/adminModel";
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
            //List
            if (payload.faqlist) {

                // ------------Filter Start------------ //
                // search
                if (payload.search) {
                    filter = { title: { $regex: new RegExp(payload.search, 'i') }, mstfaqtopicsid: payload.id, status: { $in: ['0', '1'] } }
                }
                //deault
                else {
                    filter = { mstfaqtopicsid: payload.id, status: { $in: ['0', '1'] } };
                }
                // ------------Filter End------------ //

                // ------------Sort Start------------ //
                sortObj = {}
                // ------------Sort End------------ //

                // ------------List Length Start------------ //
                let len = await faqsSchema.find(filter)
                listlength = len.length
                // ------------List Length End------------ //

                // ------------List Start------------ //
                let results = await faqsSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

                if (results.length > 0) {
                    responsestatus = StatusCodes.SUCCESS
                    result = results
                    success = true
                    message = "FAQ found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "FAQ not found"
                }
                // ------------List End------------ //
            }
            //Add
            else if (payload.addfaq) {
                let results = await faqsSchema.findOne({ question: payload.question, status: { $in: ['0', '1'] } })
                if (!results) {
                    let Obj = {
                        mstfaqtopicsid: payload.id,
                        question: payload.question,
                        answer: payload.answer,
                        status: payload.status
                    }
                    const res = new faqsSchema(Obj);
                    let r = await res.save()
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Add FAQ successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "FAQ Already exist"
                }
            }
            //Add Topic
            else if (payload.addfaqtopic) {
                let results = await faqtopicsSchema.findOne({ title: payload.title, status: { $in: ['0', '1'] } })
                if (!results) {
                    let Obj = {
                        image: payload.image,
                        title: payload.title,
                        description: payload.description,
                        status: payload.status
                    }
                    const res = new faqtopicsSchema(Obj);
                    let r = await res.save()
                    if (r) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true;
                        message = "Add FAQ Topic Successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false;
                        message = "Internal server error"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "FAQ Topic Already exist"
                }
            }
            //Topic List
            else if (payload.faqtopiclist) {

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
                let len = await faqtopicsSchema.find(filter)
                listlength = len.length
                // ------------List Length End------------ //

                // ------------List Start------------ //
                let results = await faqtopicsSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

                if (results.length > 0) {
                    responsestatus = StatusCodes.SUCCESS
                    result = results
                    success = true
                    message = "FAQ Topic found"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "FAQ Topic not found"
                }
                // ------------List End------------ //
            }
            //Topic Edit
            else if (payload.editfaqtopic) {
                let res = await faqtopicsSchema.findOne({ title: payload.title })
                if (!res) {
                    let Obj = {
                        image: payload.image,
                        title: payload.title,
                        description: payload.description,
                        status: payload.status
                    }
                    result = await faqtopicsSchema.findOneAndUpdate({ _id: payload.id }, Obj)
                    if (result) {
                        responsestatus = StatusCodes.SUCCESS
                        success = true
                        message = "Faq Topic update successfully"
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                        success = false
                        message = "Faq Topic not update successfully"
                    }
                } else {
                    responsestatus = StatusCodes.FOUND
                    success = false;
                    message = "Faq Topic Already exist"
                }
            }
            //Status
            else if (payload.onStatus) {
                result = await faqtopicsSchema.findOneAndUpdate({ _id: payload.id }, { status: payload.status })
                if (result) {
                    if (payload.status == "2") {
                        message = "Faq delete successfully"
                    } else if (payload.status == "1") {
                        message = "Faq inactive successfully"
                    } else {
                        message = "Faq active successfully"
                    }
                    responsestatus = StatusCodes.SUCCESS
                    success = true
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Faq not found"
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
