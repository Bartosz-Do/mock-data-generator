import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
import { NextRequest } from "next/server";

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 1,
});

export async function checkRateLimit(request: NextRequest): Promise<{ success: boolean; headers: Headers }> {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const res = await rateLimiter.consume(ip, 1);

    const headers = new Headers({
      "X-RateLimit-Limit": "10",
      "X-RateLimit-Remaining": String(res.remainingPoints),
      "X-RateLimit-Reset": new Date(Date.now() + res.msBeforeNext).toISOString(),
    });

    return { success: true, headers };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, headers: new Headers() };
    }
    const rejRes = err as RateLimiterRes;
    const headers = new Headers({
      "Retry-After": String(Math.round(rejRes.msBeforeNext / 1000) || 1),
      "X-RateLimit-Limit": "10",
      "X-RateLimit-Remaining": String(rejRes.remainingPoints),
      "X-RateLimit-Reset": new Date(Date.now() + rejRes.msBeforeNext).toISOString(),
    });

    return { success: false, headers };
  }
}
