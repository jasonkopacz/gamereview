import Spinner from '../../(components)/Spinner/Spinner'
import { supabase } from '@/app/database'

export async function GET() {
  console.log('here')
    const { data, error, isLoading } = await supabase
    .from('games')
    .select()

    if (error) return error.message
    else if (isLoading) return <Spinner />
    else {
        console.log(data)
    }
  return Response.json({ data })
};