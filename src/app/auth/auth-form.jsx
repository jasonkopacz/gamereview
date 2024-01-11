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
  return (
    <>
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        appearance={{ theme: ThemeSupa }}
        theme={darkMode}
        showLinks={false}
        providers={['google', 'facebook', 'twitter']}
        redirectTo="http://localhost:3000/auth/callback"
        />
    </>
  )
}