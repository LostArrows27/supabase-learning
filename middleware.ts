import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // const res = NextResponse.next()
  // const supabase = createMiddlewareClient({ req, res })
  // const url = new URL(req.url)

  // if (url.pathname === '/update') {
  //   const { data: { user } } = await supabase.auth.getUser();
  //   if (!user) {
  //     return NextResponse.redirect(new URL('/', req.url))
  //   }
  // }
  // await supabase.auth.getSession()
  // return res
}