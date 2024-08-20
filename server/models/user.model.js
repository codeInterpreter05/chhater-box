import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { genSalt } from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    color: {
        type: Number,
        required: false,
        default: 0,
    },
    profileSetUp: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const User = mongoose.model('Users', userSchema);