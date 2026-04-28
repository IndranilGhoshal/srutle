import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { consumerSchema, otpSchema } from "@/app/model/consumerModal";
import generateOtp from "../../_apiFunction/GenerateOtpFunction";
import { otpsend } from "../../_apiFunction/OtpSendFunction";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    try {
        let payload = await request.json();
        let result;
        let success;
        let message;
        let responsestatus;

        await mongoose.connect(connectionStr, { useNewUrlParser: true });

        //OTP Varify
        if (payload.otpsend) {
            let re = await otpSchema.findOne({ otp: payload.otp })
            if (re) {
                let now = new Date().getTime();
                if (re.exptime < now) {
                    let up = await otpSchema.findOneAndUpdate({ _id: re._id }, { status: "1" })
                    if (up) {
                        responsestatus = StatusCodes.Request_Timeout;
                        result = null;
                        success = false;
                        message = "Otp is expirted";
                    } else {
                        responsestatus = StatusCodes.INTERNAL_SERVER_ERROR;
                        result = null;
                        success = false;
                        message = "Internal Server Error";
                    }
                } else {
                    if (re.status == "0") {
                        let results = await consumerSchema.findOne({ phone: re.phone, status: { $in: ['0'] } })
                        if (results) {
                            let up = await otpSchema.findOneAndUpdate({ _id: re._id }, { status: "1" })
                            if (up) {
                                let data = {
                                    _id: results._id,
                                    image: results.image,
                                    firstname: results.firstname,
                                    lastname: results.lastname,
                                    email: results.email,
                                    dateofbirth: results.dateofbirth,
                                    gender: results.gender,
                                    phone: results.phone,
                                    status: results.status
                                }
                                responsestatus = StatusCodes.SUCCESS
                                result = data
                                success = true;
                                message = "User Login Successfully"
                            } else {
                                let data = {
                                    _id: results._id,
                                    image: results.image,
                                    firstname: results.firstname,
                                    lastname: results.lastname,
                                    email: results.email,
                                    dateofbirth: results.dateofbirth,
                                    gender: results.gender,
                                    phone: results.phone,
                                    status: results.status
                                }
                                responsestatus = StatusCodes.SUCCESS
                                result = data
                                success = true;
                                message = "User Login Successfully"
                            }
                        } else {
                            let data = {
                                image: "",
                                firstname: "",
                                lastname: "",
                                email: "",
                                dateofbirth: "",
                                gender: "",
                                phone: re.phone,
                                status: "0"
                            }
                            const res = new consumerSchema(data);
                            let r = await res.save()
                            if (r) {
                                let up = await otpSchema.findOneAndUpdate({ _id: r._id }, { status: "1" })
                                if (up) {
                                    responsestatus = StatusCodes.SUCCESS
                                    result = r
                                    success = true;
                                    message = "User Login Successfully"
                                } else {
                                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                                    result = null
                                    success = false;
                                    message = "Internal server error"
                                }
                            } else {
                                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                                result = null
                                success = false;
                                message = "Internal server error"
                            }
                        }
                    } else {
                        responsestatus = StatusCodes.Not_Acceptable
                        result = null
                        success = false;
                        message = "Otp is already used"
                    }
                }
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false;
                message = "Wrong Otp"
            }
        }
        //OTP Resend
        else if (payload.reotpsend) {
            let FIVE_MINUTES = new Date().getTime() + 300000;
            let re = await otpSchema.find({ phone: payload.phone })
            if (re.length > 0) {
                for (let [i, r] of re.entries()) {
                    let up = await otpSchema.findOneAndUpdate({ _id: r._id }, { status: "1" })
                    if (i === re.length - 1) {
                        let otp = generateOtp({ len: "6", nums: true })
                        let getotp = await otpsend('OTP resend your Login - ' + otp + '. From Srutle Teams', "+12727700953", "+91" + payload.phone)
                        if (getotp) {
                            let data = {
                                phone: payload.phone,
                                otp: otp,
                                exptime: FIVE_MINUTES,
                                status: "0"
                            }
                            const res = new otpSchema(data);
                            let r = await res.save()
                            if (r) {
                                responsestatus = StatusCodes.CREATED
                                result = null;
                                success = true;
                                message = "OTP resend successfully to your phone no."
                            } else {
                                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                                result = null;
                                success = false;
                                message = "Internal server error"
                            }
                        } else {
                            responsestatus = StatusCodes.Expectation_Failed
                            result = null;
                            success = false;
                            message = "OTP send Faild"
                        }
                    }
                }
            } else {
                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                result = null;
                success = false;
                message = "Internal server error"
            }
        }
        //OTP expired
        else if (payload.otpexpired) {
            let re = await otpSchema.find({ phone: payload.phone })
            if (re.length > 0) {
                for (let [i, r] of re.entries()) {
                    let up = await otpSchema.findOneAndUpdate({ _id: r._id }, { status: "1" })
                    if (i === re.length - 1) {
                        responsestatus = StatusCodes.SUCCESS
                        result = null
                        success = true;
                        message = ""
                    }
                }
            } else {
                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                result = null
                success = false;
                message = "Internal server error"
            }
        }
        //OTP Send
        else {
            let FIVE_MINUTES = new Date().getTime() + 300000;
            let otp = generateOtp({ len: "6", nums: true })
            let getotp = await otpsend('OTP for your Login - ' + otp + '. From Srutle Teams', "+12727700953", "+91" + payload.phone)
            if (getotp) {
                let data = {
                    phone: payload.phone,
                    otp: otp,
                    exptime: FIVE_MINUTES,
                    status: "0"
                }
                const res = new otpSchema(data);
                let r = await res.save()
                if (r) {
                    responsestatus = StatusCodes.SUCCESS
                    result = null
                    success = true;
                    message = "OTP send successfully to your phone no."
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    result = null
                    success = false;
                    message = "Internal server error"
                }
            } else {
                responsestatus = StatusCodes.Expectation_Failed
                result = null
                success = false;
                message = "OTP send Faild"
            }
        }

        return NextResponse.json({ result, success, message, status: responsestatus, error: 0 })
    } catch (e) {
        return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}
