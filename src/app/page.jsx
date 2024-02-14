'use client'
import styles from './page.module.css'
import AuthForm from './auth/auth-form'
import Cookies from 'js-cookie'

export default function Home() {
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
