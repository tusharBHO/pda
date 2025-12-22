// app/api/predict/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Read incoming form data
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Forward to FastAPI backend
        const forwardForm = new FormData();
        forwardForm.append("file", file, file.name || "upload.jpg");

        const FASTAPI_URL =
            process.env.FASTAPI_URL || "http://localhost:8000/predict";

        const res = await fetch(FASTAPI_URL, {
            method: "POST",
            body: forwardForm,
            // Don’t set Content-Type manually
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("/api/predict proxy error:", err);
        return NextResponse.json(
            { error: err?.message || "Unknown error" },
            { status: 500 }
        );
    }
}