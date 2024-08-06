import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import mongoose, { Mongoose } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { put, del } from '@vercel/blob'
import { revalidatePath } from "next/cache";
import axios from "axios";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function GET(request: NextRequest){
    const blogId = request.nextUrl.searchParams.get("id")
    if (blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json({blog})
    }

    const all = request.nextUrl.searchParams.get("all")
    if (all){
        try{
            const blogs = await BlogModel.find({});
            return NextResponse.json({blogs})
        }catch(e){
            console.log(e);
        }
    }

    const readMore = request.nextUrl.searchParams.get("readMore");
    if (readMore){
        const blogs = await BlogModel.aggregate([
            {$sample:{size:4}}
        ]);
        return NextResponse.json({blogs})
    }

    const page = request.nextUrl.searchParams.get("page") || 0
    const limit = request.nextUrl.searchParams.get("limit") || 3
    if (page){
        const blogs = await BlogModel.find()
        .skip(Number(page)* Number(limit))
        .limit(Number(limit))
        return NextResponse.json({blogs})
    }
}

export async function POST(request: Request){
    const formData = await request.formData();
    const timeStamp = Date.now();
    const image = formData.get('image') as File | null;
    let imgUrl;

    if (image){
        const blob = await put(`blog-app/${timeStamp}_${image.name}`,image, {
            access: 'public',
        })
        revalidatePath('/')
        imgUrl = blob.url;
    }else{
        return NextResponse.json({
            success: false,
            msg: "Invalid Image"
        })
    }

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        content: `${formData.get('content')}`,
        category: `${formData.get('category')}`,
        image: `${imgUrl}`,
    }

    await BlogModel.create(blogData);

    return NextResponse.json({
        success:true, 
        msg:"Blog Saved"
    })
}

export async function DELETE(request: NextRequest) {
    const blogID = request.nextUrl.searchParams.get("id")
    const blogIDs = request.nextUrl.searchParams.getAll("ids[]")
    if (blogID){
        try{
            const data = await BlogModel.findById(blogID)
            await del(data.image);
            await BlogModel.findByIdAndDelete(blogID)
            return NextResponse.json({
                success: true,
                msg: "Blog deleted successfully",
            })
        }catch (error){
            return NextResponse.json(
                {
                    success: false,
                    msg: error
                }
            )
        }
    }
    else if(blogIDs.length > 0){
        try{
            const imgURLs:string[] = []
            for (let i = 0; i <  blogIDs.length; i++){
                const data = await BlogModel.findById(blogIDs[i]);
                imgURLs.push(data.image)
            }
            await del(imgURLs)
            const response = await BlogModel.deleteMany({_id:blogIDs})
            return NextResponse.json({
                success: true,
                msg: `${response.deletedCount} Blog deleted successfully`,
            })
        }catch(e){
            return NextResponse.json({
                success: false,
                msg: e,
            })
        }
    }
    else{
        return NextResponse.json({
            success: false,
            msg: "No blogID is provided"
        })
    }
}