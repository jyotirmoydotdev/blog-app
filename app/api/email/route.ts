import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function GET(request: NextRequest) {
    const emails = await EmailModel.find({})
    return NextResponse.json({emails})
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }
    const exist = await EmailModel.find({email: emailData.email})
    if (exist[0]){
        return NextResponse.json({success:false,msg:"Email Already Subscribed"})
    }
    await EmailModel.create(emailData)
    return NextResponse.json({success:true,msg:"Email Subscribed"})
}

export async function DELETE(request: NextRequest) {
    const emailID = request.nextUrl.searchParams.get("id")
    const emailIDs = request.nextUrl.searchParams.getAll("ids[]")
    if(emailID){
        try{
            await EmailModel.findByIdAndDelete(emailID)
            return NextResponse.json({
                success: true,
                msg: "Email deleted successfully",
            })
        } catch (e){
            return NextResponse.json({
                success: false,
                msg: e,
            })
        }
    }else if(emailIDs.length>0){
        try{
            const response = EmailModel.deleteMany({_id:emailIDs})
            return NextResponse.json({
                success: true,
                msg: `${(await response).deletedCount} email deleted`,
            })
        }catch(e){
            return NextResponse.json({
                success: false,
                msg: e,
            })
        }
    }else{
        return NextResponse.json({
            success: false,
            msg: "No Email ID is provided",
        })
    }
}