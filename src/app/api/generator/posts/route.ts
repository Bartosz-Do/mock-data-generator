import { NextRequest, NextResponse } from "next/server";
import { PostArgs } from "@/types/generator";
import generatePosts from "@/utilities/postsGenerator";

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = await request.json();
		const { count, seed }: PostArgs = body;

		const response = await generatePosts({ count, seed });

		if (!response.ok) {
			return NextResponse.json(response, { status: 400 });
		}

		return NextResponse.json(response);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}