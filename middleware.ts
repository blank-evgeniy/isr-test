import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const method = request.method;
  const time = new Date().toISOString();

  console.log(`[Middleware][${time}] ${method} ${url}`);

  if (request.headers.get("x-next-revalidate")) {
    console.log(`[ISR][${time}] Ревалидация для ${url}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/posts/:path*",
};
