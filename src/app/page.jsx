import React from 'react'
import styles from './page.module.css'
import AuthForm from './auth/auth-form'
import Index from './(components)/Index/Index'
import { getGamesData } from './helpers/file_helpers'
import { supabase } from './database'

export default async function Home() {
  // let data = await getGamesData()
  // console.log(data)
  // const { error } = await supabase
  // .from('games')
  // .insert(data)

  return (
    <main className={styles.main}>
      <div className="row">
      <div className="col-6 auth-widget">
        {/* <AuthForm /> */}
        <Index></Index>
      </div>
    </div>
    </main>
  )
}
