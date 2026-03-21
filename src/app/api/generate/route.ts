"use server";
import { NextRequest, NextResponse } from "next/server";
import { generateData } from "@/utilities/dataGenerator";
import { GeneratorResponse, GeneratorArgs } from "@/types/generator";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { count, fields, seed }: GeneratorArgs = body;
    if (typeof count !== "number" || count < 1 || count > 300) {
      return NextResponse.json({ error: "Invalid count, must be between 1 and 300." }, { status: 400 });
    }

    if (typeof fields !== "number" && !Array.isArray(fields)) {
      return NextResponse.json({ error: "Invalid fields format." }, { status: 400 });
    }

    let message = "";

    const { result, data } = await generateData({ count, fields, seed });
    if (result == 0) {
      message = "Data generated successfully.";
    } else if (result == 1) {
      return NextResponse.json({ error: "Invalid fields selected." }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Invalid count, must be between 1 and 300." }, { status: 400 });
    }

    const response: GeneratorResponse = {
      meta: {
        count,
        generatedAt: new Date().toISOString(),
        message,
      },
      data,
    };

    return NextResponse.json(response);
  } catch (_error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
