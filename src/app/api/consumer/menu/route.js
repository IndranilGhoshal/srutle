import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { categorySchema, productTypesSchema, subCategorySchema } from "@/app/model/adminModel";
import { StatusCodes } from "../../_apiFunction/StatusCode";

export async function POST(request) {
    try {
        let payload = await request.json();
        let result;
        let success = false;
        let message;
        let listlength;
        let obj;
        let responsestatus;

        await mongoose.connect(connectionStr, { useNewUrlParser: true });

        //List
        if (payload.list) {
            // ------------List Start------------ //
            let categoryresults = await categorySchema.find({ status: { $in: ['0'] } });
            let array = []
            if (categoryresults.length > 0) {
                for (let category of categoryresults) {
                    obj = {
                        "category": { category: category._id, categoryname: category.name, subcategory: [] }
                    }
                    let subcaretoryarray = []
                    let subcategoryresults = await subCategorySchema.find({ mstcategoryid: category._id, status: { $in: ['0'] } });
                    if (subcategoryresults.length > 0) {
                        for (let subcategory of subcategoryresults) {
                            let o = { subcategory: subcategory._id, subcategoryname: subcategory.name, producttype: [] }
                            let producttypearray = []
                            let producttyperesults = await productTypesSchema.find({ mstcategoryid: category._id, mstsubcategoryid: subcategory._id, status: { $in: ['0'] } });
                            if (producttyperesults.length > 0) {
                                for (let producttype of producttyperesults) {
                                    let p = { producttype: producttype._id, producttypename: producttype.name }
                                    producttypearray.push(p)
                                }
                                o.producttype = producttypearray
                            } else {
                                o.producttype = []
                            }
                            subcaretoryarray.push(o)
                        }
                        obj.category.subcategory = subcaretoryarray
                    } else {
                        obj.category.subcategory = []
                    }
                    array.push(obj)
                }
                responsestatus = StatusCodes.FOUND
                result = array
                success = true
                message = "Menu found"
            } else {
                responsestatus = StatusCodes.NO_CONTENT
                result = null
                success = false
                message = "Menu not found"
            }
            // ------------List End------------ //
        }
        return NextResponse.json({ result, success, message, listlength, status: responsestatus, error: 0 })
    } catch (e) {
        return NextResponse.json({ result: null, success: false, message: "Internal Server Error", status: StatusCodes.INTERNAL_SERVER_ERROR, error: 1 })
    }
}