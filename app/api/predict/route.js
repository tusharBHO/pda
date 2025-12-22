// app/api/predict/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const FASTAPI_URL = process.env.FASTAPI_URL;

    // Debug + safety
    if (!FASTAPI_URL) {
      console.error("FASTAPI_URL is missing in env");
      return NextResponse.json(
        { error: "Server misconfigured: FASTAPI_URL not set" },
        { status: 500 }
      );
    }

    console.log("Calling FASTAPI_URL:", FASTAPI_URL);

    const res = await fetch(FASTAPI_URL, {
      method: "POST",
      body: formData,
    });

    console.log("FASTAPI status:", res.status);

    // If FastAPI itself errors, propagate its payload + status
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      console.error("Failed to parse FastAPI JSON:", e);
      return NextResponse.json(
        { error: "Prediction backend returned invalid JSON" },
        { status: 500 }
      );
    }

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