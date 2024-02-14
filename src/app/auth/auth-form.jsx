'use client'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function AuthForm({darkMode}) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
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