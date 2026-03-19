import mongoose from "mongoose";

interface Iuser {
    _id?:mongoose.Types.ObjectId,
    name?: string,
    image?:string,
    email : string,
    password : string 
    createedAt?: Date,
    updatedAt?: Date


}

const userSchema = new mongoose.Schema<Iuser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true  },
    image: { type: String },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<Iuser>("User", userSchema);
export default User;




