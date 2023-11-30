import { hash } from "bcryptjs";
import connectMongo from "../../lib/conn";
import Users from "@/model/Schema";
import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(request) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed" }));
  const res = await request
    .json()
    .catch((err) => console.log(err, "errorrrrrr"));

  if (!res) {
    return NextResponse.json({
      status: 404,
      error: "Don't have form data...!",
    });
  }
  const { username, email, password } = res;

  console.log(username, email, password, "data");
  let emailTaken,
    userNameTaken,
    registered = false;

  if (email) {
    const checkExistingEmail = await Users.findOne({ email });
    if (checkExistingEmail) emailTaken = true;
  }
  const checkExistingUsername = await Users.findOne({ username });

  if (checkExistingUsername) userNameTaken = true;

  if (emailTaken || userNameTaken)
    return NextResponse.json({
      userNameTaken,
      emailTaken,
    });
  try {
    const user = await Users.create({
      username,
      email,
      password: await hash(password, 12),
    });

    registered = true;
    return NextResponse.json({
      message: "User created successfully",
      registered,
    });
  } catch (error) {
    console.log("Error creating user:", error);
    return NextResponse.json({
      success: false,
      registered,
      message: "Error creating user",
    });
  }
}
