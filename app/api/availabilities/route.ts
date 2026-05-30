import { NextRequest, NextResponse } from 'next/server'
import { supabasePublic, supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month')
  const db = supabasePublic()

  let query = db
    .from('availabilities')
    .select('id, date, start_time, duration')
    .eq('is_active', true)
    .order('date')
    .order('start_time')

  if (month) {
    query = query.gte('date', `${month}-01`).lte('date', `${month}-31`)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  try {
    const { slots } = await req.json()
    const db = supabaseAdmin()
    const { data, error } = await db
      .from('availabilities')
      .upsert(slots, { onConflict: 'date,start_time' })
      .select()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const db = supabaseAdmin()
    await db.from('availabilities').delete().eq('id', id)
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
