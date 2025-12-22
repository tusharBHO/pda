// app/api/predict/route.js
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

// 1 request / 5 minutes per identifier
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, "300 s"),
});

export async function POST(request) {
  try {
    // ----- 1. Identify user (session-based) -----
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/__session=([^;]+)/);
    const sessionId = sessionMatch ? sessionMatch[1] : "no-session";

    const identifier = `session:${sessionId.slice(0, 32)}`;

    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 5 minutes." },
        { status: 429 }
      );
    }

    // ----- 2. Normal prediction logic -----
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const FASTAPI_URL = process.env.FASTAPI_URL;
    const res = await fetch(FASTAPI_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("/api/predict error:", err);
    return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
  }
}










// Actual Working Code
// // app/api/predict/route.js
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file");
//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     const FASTAPI_URL = process.env.FASTAPI_URL; // your /predict endpoint
//     const res = await fetch(FASTAPI_URL, {
//       method: "POST",
//       body: formData, // forward original FormData (includes file)
//     });

//     const data = await res.json();
//     return NextResponse.json(data, { status: res.status });
//   } catch (err) {
//     console.error("/api/predict error:", err);
//     return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
//   }
// }