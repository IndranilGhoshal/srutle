import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { giftcarddetailsSchema, giftcardpaymentsSchema, giftcardrecipientdetailsSchema, giftcardsSchema } from "@/app/model/consumerModal";
import { giftcardamountsSchema, giftcardimagesSchema } from "@/app/model/adminModel";
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "@/app/lib/config";
import { StatusCodes } from "../../_apiFunction/StatusCode";
const Razorpay = require("razorpay");

export async function POST(request) {
    try {
        let payload = await request.json();
        let result;
        let success = false;
        let message;
        let listlength;
        let responsestatus;

        await mongoose.connect(connectionStr, { useNewUrlParser: true });

        //Gift Card List
        if (payload.list) {
            // ------------List Start------------ //
            result = await giftcardsSchema.find({ status: { $in: ['0'] } });
            if (result.length > 0) {
                responsestatus = StatusCodes.FOUND
                success = true
                message = "Gift card found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                success = false
                message = "Gift card not found"
            }
            // ------------List End------------ //
        }
        //Gift Card Details
        else if (payload.giftcarddetails) {
            let results = await giftcardsSchema.findOne({ _id: payload.mstgiftcardsid, status: { $in: ['0'] } });
            if (results) {
                let imageres = await giftcardimagesSchema.find({ mstgiftcardsid: payload.mstgiftcardsid, status: { $in: ['0'] } })
                let amountres = await giftcardamountsSchema.find({ mstgiftcardsid: payload.mstgiftcardsid, status: { $in: ['0'] } })
                let obj = {}
                if (imageres.length > 0) {
                    obj.imagearray = imageres
                } else {
                    obj.imagearray = []
                }
                if (amountres.length > 0) {
                    obj.amountarray = amountres
                } else {
                    obj.amountarray = []
                }
                responsestatus = StatusCodes.FOUND
                result = obj
                success = true;
                message = "Gift Card details fetch"
            }else{
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false;
                message = "Gift Card Not Found"
            }
        }
        //Buy Gift Card 
        else if (payload.buygiftcard) {
            let giftobj = {
                mstconsumerid: payload.mstconsumerid,
                mstgiftcardsid: payload.mstgiftcardsid,
                image: payload.image,
                amount: payload.amount,
                sendername: payload.senderName,
                senderemail: payload.senderEmail,
                status: "0",
            }
            const giftres = new giftcarddetailsSchema(giftobj);
            let grs = await giftres.save()
            if (grs) {
                let giftrecipientobj = {
                    mstgiftcardsid: payload.mstgiftcardsid,
                    mstgiftcarddetailsid: grs._id,
                    recipientname: payload.recipientName,
                    recipientemail: payload.recipientEmail,
                    amount: payload.amount,
                    image: payload.image,
                    card: payload.card,
                    recipientmessage: payload.recipientMessage,
                    status: "0",
                }
                const giftrecipientres = new giftcardrecipientdetailsSchema(giftrecipientobj);
                let gresrs = await giftrecipientres.save()

                let giftpaymentobj = {
                    mstconsumerid: payload.mstconsumerid,
                    mstgiftcardsid: payload.mstgiftcardsid,
                    mstgiftcarddetailsid: grs._id,
                    status: "0",
                }

                const instance = new Razorpay({
                    key_id: RAZORPAY_KEY_ID,
                    key_secret: RAZORPAY_SECRET,
                });

                let paymentresult = await instance.payments.fetch(payload.paymentid);

                if (paymentresult) {
                    giftpaymentobj.ordercreationid = payload.ordercreationid
                    giftpaymentobj.razorpaypaymentid = payload.razorpaypaymentid
                    giftpaymentobj.razorpayorderid = payload.razorpayorderid
                    giftpaymentobj.razorpaysignature = payload.razorpaysignature

                    giftpaymentobj.paymenttype = paymentresult.method
                    giftpaymentobj.paymentamount = payload.paymentamount
                    giftpaymentobj.paymentstatus = "Success"
                }

                const giftpayres = new giftcardpaymentsSchema(giftpaymentobj);
                let gpayrs = await giftpayres.save()

                if (gpayrs) {
                    responsestatus = StatusCodes.CREATED
                    success = true
                    message = "Gift card buy successfully"
                } else {
                    responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                    success = false
                    message = "Internal server error"
                }
            } else {
                responsestatus = StatusCodes.INTERNAL_SERVER_ERROR
                success = false
                message = "Internal server error"
            }
        }
        //Send Gift Card
        else if (payload.sendgift) {
            let results = await giftcarddetailsSchema.find({ senderemail: payload.senderemail, status: { $in: ['0'] } });
            if (results.length > 0) {
                responsestatus = StatusCodes.FOUND
                result = results
                success = true
                message = "Gift card found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "Gift card not found"
            }
        }
        //Receive Gift Card 
        else if (payload.receivegift) {
            let results = await giftcardrecipientdetailsSchema.find({ recipientemail: payload.recipientemail, status: { $in: ['0'] } });
            if (results.length > 0) {
                responsestatus = StatusCodes.FOUND
                result = results
                success = true
                message = "Gift card found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "Gift card not found"
            }
        }
        //Receive Details Gift Card
        else if (payload.receivedetailsgift) {
            let results = await giftcardrecipientdetailsSchema.findOne({ mstgiftcardsid: payload.mstgiftcardsid, status: { $in: ['0'] } });
            if (results) {
                responsestatus = StatusCodes.FOUND
                result = results
                success = true
                message = "Gift card found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "Gift card not found"
            }
        }

        return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
    } catch (e) {
        return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}