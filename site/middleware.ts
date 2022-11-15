// /middleware.ts

import { type NextRequest, NextResponse } from 'next/server'

// make sure the middleware only runs when
// the requested url starts with `/campaign/test`
export const config = {
  matcher: ['/campaign/test(.*)'],
}

const THRESHOLD = 0.5 // initial threshold for the new variant (50%)
const COOKIE_NAME = 'tmp_ab_test' // name of the cookie to store the variant

export function middleware(req: NextRequest) {
  // get the variant from the cookie
  // if not found, randomly set a variant based on threshold
  const variant =
    req.cookies.get(COOKIE_NAME) ||
    (Math.random() < THRESHOLD ? 'control' : 'test')

  const url = req.nextUrl.clone()

  if (variant === 'control') {
    url.pathname = '/campaign/1'
  } else {
    url.pathname = '/campaign/2'
  }

  const res = NextResponse.rewrite(url)

  // set the variant in the cookie if not already set
  if (!req.cookies.get(COOKIE_NAME)) {
    res.cookies.set(COOKIE_NAME, variant)
  }
  return res
}
