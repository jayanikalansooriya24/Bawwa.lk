import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Bawwalk:Bawwalk1234@cluster0.lkela.mongodb.net/Bawwalk').then(()=>console.log("DB Connected"));
}