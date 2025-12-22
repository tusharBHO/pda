// app/api/predict/route.js
import { NextResponse } from "next/server";

const LAST_CALL_MAP = new Map(); // key -> timestamp (ms)

// 1 request / 5 minutes
const WINDOW_MS = 5 * 60 * 1000;

export async function POST(request) {
  // 1. Pick an identifier (session cookie, or fallback to IP)
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/__session=([^;]+)/);
  const sessionId = match ? match[1] : "anon";

  const identifier = `session:${sessionId.slice(0, 32)}`;

  // 2. Read last call time
  const now = Date.now();
  const lastCall = LAST_CALL_MAP.get(identifier) || 0;
  const diff = now - lastCall;

  if (diff < WINDOW_MS) {
    // Too soon: block
    return NextResponse.json(
      { error: "Too many requests. Please wait 5 minutes." },
      { status: 429 }
    );
  }

  // 3. Record this call
  LAST_CALL_MAP.set(identifier, now);

  // 4. Your existing prediction logic (no Upstash)
  try {
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











// // Actual Working Code
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