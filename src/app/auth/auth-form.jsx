'use client'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function AuthForm({darkMode}) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsenV4aG1sa2NqdXFsa3NkeWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MzY0NzcsImV4cCI6MjAyMDQxMjQ3N30.H3nQysecR34LwAcEfmvp9CVxWFMZkSvzEgDgaYkGAMQ")
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