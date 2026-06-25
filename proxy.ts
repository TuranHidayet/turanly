import { NextResponse } from "next/server";

const locales = ["az", "en", "ru"];
const defaultLocale = "az";

function getLocale(request: Request): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && locales.includes(preferred)) return preferred;
  return defaultLocale;
}

export function proxy(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
