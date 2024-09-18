import mongoose, { mongo } from "mongoose";
const converastionSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],

        }
    ],
    //createdAt, updatedAt => message.createdAt
},{timestamps:true});
const Conversation = mongoose.model("Conversation", converastionSchema);
export default Conversation;