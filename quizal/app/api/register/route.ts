import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    let { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    }
    if (password.length > 20) {
      return NextResponse.json(
        { message: "Password must be at most 20 characters long" },
        { status: 400 },
      );
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return NextResponse.json(
        { message: "Username can only contain letters and numbers" },
        { status: 400 },
      );
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 },
      );
    }
    console.log(username.length);
    if (username.length < 3) {
      return NextResponse.json(
        { message: "Username must be at least 3 characters long" },
        { status: 400 },
      );
    }
    if (username.length > 20) {
      return NextResponse.json(
        { message: "Username must be at most 20 characters long" },
        { status: 400 },
      );
    }
    if (!password.match(/^[a-zA-Z0-9]+$/)) {
      return NextResponse.json(
        { message: "Password can only contain letters and numbers" },
        { status: 400 },
      );
    }
    password = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return NextResponse.json(
      { message: "User successfully created. Redirecting..." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
