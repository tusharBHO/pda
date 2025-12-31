// Updated for huggingface deployment
// app/api/predict/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file"); // coming from frontend

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const forwardForm = new FormData();

    // 🔥 IMPORTANT: match FastAPI field name
    // forwardForm.append("image", file, file.name || "upload.jpg");
    forwardForm.append("file", file, file.name || "upload.jpg");

    const res = await fetch(process.env.FASTAPI_URL, {
      method: "POST",
      body: forwardForm,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Predict proxy error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}