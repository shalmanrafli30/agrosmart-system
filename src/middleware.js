import { NextResponse } from "next/server";

export async function middleware(request) {
    const { pathname, search } = request.nextUrl;

    // Tangkap semua permintaan yang diawali dengan `/api`
    if (pathname.startsWith("/api")) {
        const baseURL = "http://api.kawaltani.id:8082";
        const targetUrl = `${baseURL}${pathname}${search}`;

        console.log("Middleware Proxying to:", targetUrl); // Debugging

        try {
            // Proxy request ke API eksternal
            const response = await fetch(targetUrl, {
                method: request.method,
                headers: {
                    ...Object.fromEntries(request.headers),
                    host: undefined, // Hapus header `host`
                },
                body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
            });

            const headers = new Headers(response.headers);
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

            if (request.method === "OPTIONS") {
                return new NextResponse(null, { headers, status: 204 });
            }

            return new NextResponse(await response.text(), {
                headers,
                status: response.status,
            });
        } catch (error) {
            console.error("Error proxying request:", error);
            return new NextResponse("Error proxying request", { status: 500 });
        }
    }

    return NextResponse.next();
}
