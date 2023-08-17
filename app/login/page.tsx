'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { Provider, createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const mySchema = z.string().email();

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-in')
  const [isEmail, setIsEmail] = useState<boolean>(true);


  const router = useRouter()

  const supabase = createClientComponentClient()
  const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabaseClient.auth.signUp({
      email, password
    })
    setView('sign-in');
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.push('/')
    router.refresh()
  }

  const signInWithSocial = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>
      {view === 'check-email' ? (
        <p className="text-center text-foreground">
          Check <span className="font-bold">{email}</span> to continue signing
          up
        </p>

      ) : (view === 'reset-password' ? (
        <>
          <div className="mt-20">
            <label className="text-md mr-3" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="email"
              onChange={(e) => {
                setPassword(e.target.value)
                if (!isEmail) setIsEmail(true);
              }}
              value={password}
            />
          </div>
          {!isEmail && <h2 className="text-red-600 text-md font-bold">Wrong Email Format !!</h2>}
          <button onClick={async (e) => {
            const result = mySchema.safeParse(password);
            if (!result.success) {
              setIsEmail(false);
              return
            }
            await supabase.auth.resetPasswordForEmail(password);
          }} className="bg-green-700 rounded px-4 py-2 text-white mb-6">
            Recover Password
          </button>
        </>
      ) :
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === 'sign-in' && (
            <>
              <div className='grid place-items-center'>
                <button onClick={e => signInWithSocial('discord')} className="bg-purple-800 rounded px-4 py-2 text-white mb-6">
                  Sign In With Discord
                </button>
                <button onClick={e => signInWithSocial('facebook')} className="bg-blue-600 rounded px-4 py-2 text-white mb-6">
                  Sign In With Facebook
                </button>
              </div>
              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                Sign In
              </button>
              <p className="text-sm text-center">
                Don't have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView('sign-up')}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          )}
          {view === 'sign-up' && (
            <>
              <div className='grid place-items-center'>
                <button onClick={e => signInWithSocial('discord')} className="bg-purple-800 rounded px-4 py-2 text-white mb-6">
                  Sign In With Discord
                </button>
                <button onClick={e => signInWithSocial('facebook')} className="bg-blue-600 rounded px-4 py-2 text-white mb-6">
                  Sign In With Facebook
                </button>
              </div>
              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                Sign Up
              </button>
              <p className="text-sm text-center">
                Already have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView('sign-in')}
                >
                  Sign In Now
                </button>
              </p>
            </>
          )}
          <p className="text-sm text-center">
            Forgot your password ?
            <button
              className="ml-1 underline"
              onClick={() => setView('reset-password')}
            >
              Reset now
            </button>
          </p>
        </form>
      )}
    </div>
  )
}
