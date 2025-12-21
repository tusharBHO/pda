// app/api/predict/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const FASTAPI_URL = process.env.FASTAPI_URL; // your /predict endpoint
    const res = await fetch(FASTAPI_URL, {
      method: "POST",
      body: formData, // forward original FormData (includes file)
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("/api/predict error:", err);
    return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
  }
}