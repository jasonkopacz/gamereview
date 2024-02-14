import styles from './page.module.css'
import AuthForm from './auth/auth-form'

export default function Home() {
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
