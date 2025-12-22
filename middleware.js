// middleware.js
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

// 1 request / 5 minutes
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(1, "300 s"),
});

const publicPaths = ["/", "/sign-in", "/sign-up", "/how-it-works", "/terms"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (!isPublic) {
    const sessionId = req.cookies.get("__session")?.value;
    if (!sessionId) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/api/predict")) {
    try {
      const identifier = "prod-test-user";

      const { success } = await ratelimit.limit(identifier);

      if (!success) {
        return NextResponse.json(
          { error: "Too many requests. Please wait 5 minutes." },
          { status: 429 }
        );
      }
    } catch (error) {
      console.error("Rate limit error in middleware:", error);
    }
  }


  // if (pathname.startsWith("/api/predict")) {
  //   try {
  //     const sessionId = req.cookies.get("__session")?.value || "no-session";
  //     const identifier = `session:${sessionId.slice(0, 32)}`;

  //     console.log("MIDDLEWARE HIT /api/predict");
  //     console.log("RATE_LIMIT identifier", identifier);

  //     const { success } = await ratelimit.limit(identifier);

  //     if (!success) {
  //       console.log("RATE_LIMIT BLOCKED", identifier);
  //       return NextResponse.json(
  //         { error: "Too many requests. Please wait 5 minutes." },
  //         { status: 429 }
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Rate limit error in middleware:", error);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next/static|_next/image|favicon.ico).*)",
    "/api/(.*)",
  ],
};








// // middleware.js – temporary debug version
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   console.log("MIDDLEWARE HIT", req.nextUrl.pathname);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!.*\\..*|_next/static|_next/image|favicon.ico).*)",
//     "/api/(.*)",
//   ],
// };








// Actual Working
// // middleware.js - FIXED VERSION
// import { Ratelimit } from "@upstash/ratelimit";
// import { kv } from "@vercel/kv";
// import { NextResponse } from "next/server";

// const ratelimit = new Ratelimit({
//   redis: kv,
//   limiter: Ratelimit.slidingWindow(1, "300 s"),
// });

// // ✅ SIMPLER + BULLETPROOF public route check
// const publicPaths = [
//   "/",
//   "/sign-in",
//   "/sign-up", 
//   "/how-it-works",
//   "/terms",
// ];

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   // 1. AUTH PROTECTION (SIMPLE EXACT MATCH)
//   const isPublic = publicPaths.some(path => pathname === path || pathname.startsWith(path + "/"));
  
//   if (!isPublic) {
//     const sessionId = req.cookies.get("__session")?.value;
//     if (!sessionId) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/sign-in";
//       return NextResponse.redirect(url);
//     }
//   }

//   // 2. RATE LIMIT (unchanged)
//   if (pathname === "/api/predict") {
//     const sessionId = req.cookies.get("__session")?.value;
//     const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
//     const identifier =
//       (sessionId && `session:${sessionId.slice(0, 32)}`) ||
//       (ip && `ip:${ip}`) ||
//       "anonymous";

//     const { success } = await ratelimit.limit(identifier);
//     if (!success) {
//       return NextResponse.json(
//         { error: "Too many requests. Please wait 5 minutes." },
//         { status: 429 }
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!.*\\..*|_next/static|_next/image|favicon.ico).*)",
//     "/api/(.*)",
//   ],
// };