
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    { path : '/sign-in', whenAuthenticated : 'redirect' },
    { path : '/register', whenAuthenticated : 'redirect' },
    { path : '/sign-out', whenAuthenticated : 'next' },
    { path : '/price', whenAuthenticated : 'next' },
]as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in"

export async  function middleware(request : NextRequest){
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)

    const authToken = request.cookies.get('tokenRV2Adm')
    
    if(!authToken && publicRoute) {
        return NextResponse.next()
    }

    if(!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

        return NextResponse.redirect(redirectUrl)
    }

    if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {

       const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/'

        return NextResponse.redirect(redirectUrl)
    }

    if(authToken && !publicRoute) {
        if(!authToken){
            const response = NextResponse.redirect(new URL("/", request.url))
            response.cookies.delete('tokenRV2Adm')
            return response
        }
        return NextResponse.next()    
    }

    return NextResponse.next()
}

export const config : MiddlewareConfig = {
    matcher : [
         /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        */
       // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
       '/((?!api|_next/|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.svg$).*)',
    ]
}