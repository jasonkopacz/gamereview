'use client'
import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Cookies from 'js-cookie'
import { COLOR_THEME_COOKIE_NAME } from '../constants'

export default function AuthForm() {
  const supabase = createClientComponentClient()
  const darkMode = Cookies.get(COLOR_THEME_COOKIE_NAME) === 'light' ? 'default' : 'dark'
  const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;
  return (
    <>
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        appearance={{ theme: ThemeSupa }}
        theme={darkMode}
        showLinks={false}
        providers={['google']}
        redirectTo={`https://gamereview-p4fkfqqd7-alaizard.vercel.app/auth/callback`}
        />
    </>
  )
}