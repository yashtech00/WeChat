import mongoose from "mongoose"

const Schema = mongoose.Schema

const ChatSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ChatModel = mongoose.model("chat", ChatSchema);

export default ChatModel;