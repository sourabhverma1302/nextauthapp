import mongoose, { Document, Schema, Model } from 'mongoose';

interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenDate?: Date;
    verifyToken?: string;
    verifyTokenDate?: Date;
}

const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenDate: Date,
    verifyToken: String,
    verifyTokenDate: Date,
});

const UserModel: Model<UserDocument> = mongoose.models.users || mongoose.model<UserDocument>('users', userSchema);

export default UserModel;
