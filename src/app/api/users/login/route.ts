import { dbconnect } from "@/dbConfig/dbConfig";
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


dbconnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        console.log("user login", user);

        if (!user) {
            return NextResponse.json({ message: "User Does Not Exists" }, { status: 400 })
        }

        const validpass = await bcryptjs.compare(password, user?.password);
        if (!validpass) {
            NextResponse.json({ error: "Invalid Pass" }, { status: 400 });
        }
        //create tokendata
        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        //create token
        const token = await jwt.sign(tokendata, process.env.TOKEN!, { expiresIn: "1d" });

        const response = NextResponse.json({
            username: user.username,
            message: "Logged In Succes",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response;

    } catch (err: any) {
        NextResponse.json({ error: err.message }, { status: 400 });
    }
}