import mongoose from "mongoose";

export const ConnectDB = async ()=> {
    const CONNECT_STRING = process.env.MONGOOSE;
    if(CONNECT_STRING){
        await mongoose.connect(CONNECT_STRING)
        console.log("DB Connected");
    }else{
        console.log("DB Not Connect")
    }
}