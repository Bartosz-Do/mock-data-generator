import { NextRequest, NextResponse } from "next/server";
import { generateData } from "@/utilities/generator";

interface Response {
  meta: {
    count: number;
    generatedAt: string;
    message: string;
  };
  data?: Record<string, string>[];
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const { count, fields, seed }: { count: number; fields: number; seed?: number } = body;

  let message = "";

  const { result, data } = generateData(count, fields, seed);
  if (result == 0) {
    message = "Data generated successfully.";
  } else if (result == 1) {
    message = "Invalid fields selected.";
  } else {
    message = "Invalid count, must be between 1 and 300.";
  }

  const response: Response = {
    meta: {
      count,
      generatedAt: new Date().toISOString(),
      message,
    },
    data,
  };

  return NextResponse.json(response);
}
