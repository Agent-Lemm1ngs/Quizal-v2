import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import signIn from "next-auth";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!exist) {
      return NextResponse.json(
        { message: "Email or Password incorrect" },
        { status: 400 },
      );
    }

    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(password, exist.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (!result) {
      // Passwords do not match
      return NextResponse.json(
        { message: "Email or Password incorrect" },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        { message: "Successfully validated. Redirecting..." },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
