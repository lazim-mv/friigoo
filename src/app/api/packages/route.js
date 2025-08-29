
// app/api/packages/route.js
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// ⚡ create a server-side supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)


export async function GET() {
    try {
        const { data, error } = await supabase
            .from('travel_packages')
            .select(`
                    *,
                    travel_package_days (*)
                `)
            .order('created_at', { ascending: false });

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
