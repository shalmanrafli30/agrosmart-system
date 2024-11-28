import { NextResponse } from "next/server";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Proxy semua permintaan yang diawali dengan `/api`
    if (pathname.startsWith("/api")) {
        const url = new URL(request.nextUrl);
        url.hostname = "103.165.222.254"; // Host API eksternal
        url.port = "8095"; // Port API eksternal
        url.pathname = pathname.replace("/api", "/kwt24/api"); // Path API eksternal

        return fetch(url.toString(), {
            method: request.method,
            headers: request.headers,
            body: request.body,
        }).then((response) => {
            return new NextResponse(response.body, {
                headers: response.headers,
                status: response.status,
            });
        });
    }

    return NextResponse.next();
}
