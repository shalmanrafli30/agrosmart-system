import { NextResponse } from "next/server";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Proxy semua permintaan yang diawali dengan `/api`
    if (pathname.startsWith("/api")) {
        const url = new URL(request.nextUrl);
        url.hostname = "api.kawaltani.id"; // Host API eksternal
        url.port = "8095"; // Port API eksternal
        url.pathname = pathname.replace("/api", "/kwt24/api"); // Path API eksternal

        try {
            const response = await fetch(url.toString(), {
                method: request.method,
                headers: request.headers,
                body: request.body,
            });

            // Buat respons dengan header CORS
            const headers = new Headers(response.headers);
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

            // Tangani permintaan OPTIONS (preflight request)
            if (request.method === "OPTIONS") {
                return new NextResponse(null, { headers, status: 204 });
            }

            return new NextResponse(response.body, {
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
