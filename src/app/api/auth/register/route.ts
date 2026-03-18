import connectDb from "@/lib/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    await connectDb();
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to register user: ${error}` },
      { status: 500 },
    );
  }
}

// signup up  functionality

// step 1  connectDB function
// step 2  mongoose.connect() method
// step 3  create user schema and model
// step 4  create new user document and save to database

// signup
//  --> check exist user
//   --> password check for 6 character   (optional )-  (encryption of password) -bCRYPT Js
//    ->create new user document and save to database
//   --> return success response  or error response

//status codes
// 200 - success
// 201 - created
// 201-to-300 -sucess

//front end Error  codes 400 - 499
// 400 - bad request

// server error codes 500 - 599
// 500 - internal server error
