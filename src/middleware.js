import { NextResponse } from 'next/server';

export async function middleware(request) {
    const response = NextResponse.next();

    // Tambahkan header CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Izinkan metode OPTIONS
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: response.headers,
        });
    }

    return response;
}
