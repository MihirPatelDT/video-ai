import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"

// callbacks for define in which pages user can access and func middleware() then pass to next() 
export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        )
          return true

        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true
        }

        return !!token
      },
    },
  }
)

// Below is what to tell middleware in which routes it should run except below define
export const config = {
  matcher: [
    // Match all request path except:
    // - _next/static (static files)
    // - _next/image (image optimization file)
    // - favicon.ico (favicon file)
    // - public folder
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
