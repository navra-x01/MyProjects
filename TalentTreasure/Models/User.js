import mongoose from "mongoose";
const {Schema,model}=mongoose

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true},
    username: {type: String, required: true},
    cover: {type: String},
    profile: {type: String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    done:{type:Boolean,default:false},
  });

 
  export default mongoose.models.User || model('User', UserSchema);