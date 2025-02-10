import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';



const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 获取 token
  const token = request.cookies.get('token')?.value;
  
  // 获取当前路径
  const { pathname } = request.nextUrl;
  // 不需要验证的路径列表
  const publicPaths = ['/login', '/register', '/forgot-password'];

  console.log('pathname', pathname);
  
  // 检查当前路径是否在公开路径列表中
  const isPublicPath = publicPaths.some(path => 
    pathname.endsWith(path)
  );

  // 如果没有 token 且不是公开路径，重定向到登录页面
  if (!token && !isPublicPath) {
    const locale = pathname.startsWith('/zh') ? 'zh' : 'en';
    const url = new URL(`/${locale}/login`, request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // 继续处理国际化中间件
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(zh|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};