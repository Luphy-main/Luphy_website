import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret défini dans SANITY_REVALIDATE_SECRET (variable d'environnement)
// Sanity envoie : POST /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
// Body JSON Sanity webhook : { _type, _id, slug, ... }

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const envSecret = process.env.SANITY_REVALIDATE_SECRET

  if (envSecret && secret !== envSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const docType: string = body?._type ?? body?.document?._type ?? ''

    // Site petit : on revalide tout, quel que soit le type publié, pour n'oublier aucune page
    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, type: docType, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Revalidation error', err: String(err) }, { status: 500 })
  }
}

// Sanity vérifie parfois avec GET pour tester l'endpoint
export async function GET() {
  return NextResponse.json({ ok: true, message: 'Revalidation endpoint ready' })
}
