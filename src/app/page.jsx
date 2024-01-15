import React from 'react'
import styles from './page.module.css'
import AuthForm from './auth/auth-form'
import Dashboard from './(components)/dashboard/page'
import { supabase } from './database';
export default async function Home() {
  const { data, error } = await supabase.auth.getSession()
  const isLoggedIn = data.session

  return (
    <main className={styles.main}>
      <div className="row">
      <div className="col-6 auth-widget">
        {isLoggedIn && <Dashboard />}
       {!isLoggedIn && <AuthForm />}
      </div>
    </div>
    </main>
  )
}
