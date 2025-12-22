// app/api/predict/route.js
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

// 1 request / 5 minutes per user
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, "300 s"),
});

export async function POST(request) {
  try {
    // ----- 1. Rate limit (session-based) -----
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/__session=([^;]+)/);
    const sessionId = match ? match[1] : "no-session";
    const identifier = `session:${sessionId.slice(0, 32)}`;

    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 5 minutes." },
        { status: 429 }
      );
    }

    // ----- 2. Parse form-data -----
    let formData;
    try {
      formData = await request.formData();
    } catch (e) {
      console.error("Failed to read formData in /api/predict:", e);
      return NextResponse.json(
        { error: "Invalid upload payload" },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ----- 3. Validate FASTAPI_URL -----
    const FASTAPI_URL = process.env.FASTAPI_URL;
    if (!FASTAPI_URL) {
      console.error("FASTAPI_URL is missing in env");
      return NextResponse.json(
        { error: "Server misconfigured: FASTAPI_URL not set" },
        { status: 500 }
      );
    }

    console.log("Calling FASTAPI_URL:", FASTAPI_URL);

    // ----- 4. Call FastAPI backend -----
    let res;
    try {
      res = await fetch(FASTAPI_URL, {
        method: "POST",
        body: formData,
      });
    } catch (e) {
      console.error("Network error calling FASTAPI_URL:", e);
      return NextResponse.json(
        { error: "Cannot reach prediction backend" },
        { status: 502 }
      );
    }

    console.log("FASTAPI status:", res.status);

    // ----- 5. Parse JSON from backend -----
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.error("Failed to parse FastAPI JSON:", e);
      return NextResponse.json(
        { error: "Prediction backend returned invalid JSON" },
        { status: 500 }
      );
    }

    // Forward backend status + payload
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("/api/predict error (outer):", err);
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