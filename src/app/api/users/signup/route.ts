import { dbconnect } from "@/dbConfig/dbConfig";
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

dbconnect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("reqBody", reqBody);
        const { username, email, password } = reqBody;

        console.log("reqbody", reqBody);

        //check if user already exist
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User Already Exist" }, { status: 400 })
        }

        //hashPassword
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPass
        })

        const savedUser = await newUser.save();
        console.log("savedUser", savedUser);

        return NextResponse.json({
            message: "User Created Succesfully",
            success: true,
            savedUser
        })

    } catch (err: any) {
        return NextResponse.json({ error: err.message },
            { status: 500 })
    }
}