'use client'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { COLOR_THEME_COOKIE_NAME } from '../constants'

export default function AuthForm() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
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
        redirectTo={URL}
        />
    </>
  )
}