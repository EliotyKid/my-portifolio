import { type NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(
    "x-portfolio-language",
    request.nextUrl.searchParams.get("lang") === "en" ? "en" : "pt-BR",
  );
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/", "/work/:path*", "/about", "/contact"] };
