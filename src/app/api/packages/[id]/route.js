import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// server-side Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET(req, context) {
    try {
        const { id } = await context.params

        const { data, error } = await supabase
            .from('travel_packages')
            .select(`
        *,
        travel_package_days (*)
      `)
            .eq('id', id)   // filter by id
            .single()       // since we expect only one row

        if (error) {
            console.error('Supabase error:', error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data, { status: 200 })
    } catch (err) {
        console.error('API error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
