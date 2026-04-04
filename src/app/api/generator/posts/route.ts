import { NextRequest, NextResponse } from "next/server";
import { PostArgs } from "@/types/generator";
import generatePosts from "@/utilities/postsGenerator";
import { checkRateLimit } from "@/utilities/ratelimit/rateLimiter";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimit = await checkRateLimit(request);
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: rateLimit.headers });
    }

    const body = await request.json();
    const { count, seed }: PostArgs = body;

    const response = await generatePosts({ count, seed });

    if (!response.ok) {
      return NextResponse.json(response, { status: 400, headers: rateLimit.headers });
    }

    return NextResponse.json(response, { headers: rateLimit.headers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
