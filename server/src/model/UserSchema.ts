import mongoose, { mongo } from "mongoose"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required:true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;