import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Add more public routes here
const isPublicRoute = createRouteMatcher([
    "/(auth)/sign-in(.*)", // sign-in + nested routes
    "/(auth)/sign-up(.*)", // sign-up + nested routes
    "/",                   // homepage
    "/api/predict",        // 👈 allow API proxy without login
    "/upload",             // 👈 allow upload page without login (optional)
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect(); // redirect if not logged in
    }
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)", // everything except static files & _next
        "/",                      // homepage
    ],
};










// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // ✅ Mark all auth routes as public (with (.*) so Clerk internals don't get blocked)
// const isPublicRoute = createRouteMatcher([
//     "/(auth)/sign-in(.*)", // sign-in + nested routes
//     "/(auth)/sign-up(.*)", // sign-up + nested routes
//     "/",                   // homepage public
// ]);

// export default clerkMiddleware(async (auth, req) => {
//     if (!isPublicRoute(req)) {
//         await auth.protect(); // redirect if not logged in
//     }
// });

// export const config = {
//     matcher: [
//         "/((?!.*\\..*|_next).*)", // everything except static files & _next
//         "/",                      // homepage
//     ],
// };










// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//     "/(auth)/sign-in(.*)", // allow all sign-in paths
//     "/(auth)/sign-up(.*)", // allow all sign-up paths
//     "/",                   // homepage public
// ]);

// export default clerkMiddleware(async (auth, req) => {
//     if (!isPublicRoute(req)) {
//         await auth.protect(); // redirect to sign-in if not authenticated
//     }
// });

// export const config = {
//     matcher: [
//         // Protect everything except static files and _next
//         "/((?!.*\\..*|_next).*)",
//         "/",
//     ],
// };









// // middleware.ts
// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//   // 👇 these routes are public (no login required)
//   publicRoutes: ["/", "/sign-in", "/sign-up"],

//   // 👇 optional: make API routes public if you need
//   ignoredRoutes: ["/api/webhook"],
// });

// export const config = {
//   matcher: [
//     // Protect everything except static files and _next
//     "/((?!.*\\..*|_next).*)",
//     "/",
//   ],
// };
