import { NextRequest, NextResponse } from "next/server";
import generateData from "@/utilities/dataGenerator";
import { UserArgs } from "@/types/generator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { count, fields, seed }: UserArgs = body;

    const response = await generateData({ count, fields, seed });

    if (!response.ok) {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}