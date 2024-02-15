'use client'
import React from 'react'
import styles from './page.module.css'
import AuthForm from './auth/auth-form'
import Cookies from 'js-cookie'
import { COLOR_THEME_COOKIE_NAME } from './constants'
import { supabase } from './database'
export default function Home() {
  React.useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      // Handle session, e.g., redirecting the user or fetching user details
      if (session) {
        console.log('User is logged in:', session.user)
        // Redirect to a protected route
      } else {
        console.log('User is logged out')
        // Redirect to the login page
      }
    })
  }, [])
const darkMode = Cookies.get(COLOR_THEME_COOKIE_NAME) === 'light' ? 'default' : 'dark'
    return (
      <main className={styles.main}>
      <div className="row">
      <div className="col-6 auth-widget">
        <AuthForm darkMode={darkMode}/>
      </div>
    </div>
    </main>
  )
}
