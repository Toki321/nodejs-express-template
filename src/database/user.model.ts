import mongoose, { Document, Model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IUser extends Document {
  email: string;
  username: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

// 3. Create a Model.
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
