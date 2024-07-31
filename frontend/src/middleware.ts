import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const role = request.cookies.get("role")?.value;
    console.log(role)
    if(role == null || role == "participant" && request.url.includes("CoordinatorDashboard")){
        return NextResponse.redirect(new URL('http://localhost:3000', request.url))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/CoordinatorDashboard']
}