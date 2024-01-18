import React from 'react'
import styles from './page.module.css'
import AuthForm from './auth/auth-form'
import Dashboard from './(components)/dashboard/page'
import { supabase } from './database';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isLoggedIn } from './utils/isLoggedIn';

export default async function Home() {
    return (
      <main className={styles.main}>
      <div className="row">
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
    </main>
  )
}
