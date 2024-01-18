import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
// import { supabase } from '@/app/database'
import AccountForm from './edit/AccountForm'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  // const { data: { games } } = await supabase.from('profiles').select('games').eq('id', 'b400342e-4f57-4823-9b05-45ecf94b539a')
  // const myGames = user.games
  // console.log(games)
  return (
    <>
      <Link href="/profile/edit" > Edit Profile </ Link >
      <AccountForm session={session} />
    </>
  )
}