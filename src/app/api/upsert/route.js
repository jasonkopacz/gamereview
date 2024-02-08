import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from '@/app/database'

export async function GET(request) {
    const cookieStore = cookies()
    // const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const apiKey = 'd769c6d72b58557bdef8f2c3893df62f330b04d6';
    const baseUrl = 'https://www.giantbomb.com/api';
    const endpoint = '/games'; // Replace with your specific endpoint
    let limit = 100;
    let offset = 0;
    let page = 1; 
    const format = 'json';
    let field_list = 'api_detail_url,deck,guid,id,name';
    let results = [];

    const fetchData = async () => {
      try {
        console.log(page)
        const response = await fetch(`${baseUrl}${endpoint}?api_key=${apiKey}&offset=${offset}&page=${page}&format=${format}&field_list=${field_list}`);
        let res = await response.json();
        results.push(...res.results);
        
      await supabase
        .from('games')
        .insert({ ...results })
        // .select()

        const data = await supabase.from('games').select('*')
    return

      // return
      // data.results.map(item => results.push(deepFlattenToObject(item)))
      // Process and use the data from this page as needed
      
      // Check if there are more pages
      if (page === 1) {
        page++;
        offset+=100;
        // createAndWriteToCsv(data.results)
        fetchData();
      }
      else if (data.number_of_total_results > page * limit) {
        page++;
        offset+=100;
        // appendToCsv(data.results);
        fetchData(); // Fetch the next page
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
    const { data, error } = await supabase
    .from('games')
    .upsert({ ...results })
    .select()


  fetchData();
  // return NextResponse.next();
  return NextResponse.redirect('/dashboard', {
    status: 301,
  })
}