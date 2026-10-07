// Applique un fichier de contenu JSON à une étude de cas Sanity.
// Usage : node scripts/sanity-patch.mjs docs/private/contenu/allyum.json          (aperçu, n'écrit rien)
//         node scripts/sanity-patch.mjs docs/private/contenu/allyum.json --apply  (écrit dans Sanity)
//         node scripts/sanity-patch.mjs --show allyum                             (affiche le document actuel)
// Le token SANITY_WRITE_TOKEN est lu dans .env.local (jamais committé).
import { createClient } from '@sanity/client'
import fs from 'fs'
import crypto from 'crypto'

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter(l => l.includes('='))
    .map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
)
if (!env.SANITY_WRITE_TOKEN) { console.error('SANITY_WRITE_TOKEN absent de .env.local'); process.exit(1) }
const client = createClient({ projectId: 'fbdmm8o7', dataset: 'production', apiVersion: '2024-01-01', token: env.SANITY_WRITE_TOKEN, useCdn: false })

const args = process.argv.slice(2)
const key = () => crypto.randomBytes(6).toString('hex')
const withKeys = v => Array.isArray(v) ? v.map(x => (x && typeof x === 'object' && !x._key) ? { _key: key(), ...x } : x) : v

if (args[0] === '--show') {
  const doc = await client.fetch('*[_type=="casClient" && slug.current==$s][0]', { s: args[1] })
  console.log(JSON.stringify(doc, null, 2)); process.exit(0)
}

const file = JSON.parse(fs.readFileSync(args[0], 'utf8'))
const apply = args.includes('--apply')
const ids = await client.fetch('*[_type=="casClient" && slug.current==$s]._id', { s: file.slug })
if (!ids.length) { console.error('Aucune étude avec le slug', file.slug); process.exit(1) }
const set = Object.fromEntries(Object.entries(file.set || {}).map(([k, v]) => [k, withKeys(v)]))
const setIfMissing = file.setIfMissing || {}

for (const id of ids) {
  const before = await client.getDocument(id)
  console.log(`\n=== ${id} ===`)
  for (const [k, v] of Object.entries(set)) {
    const a = JSON.stringify(before[k]), b = JSON.stringify(v)
    if (a !== b) console.log(`- ${k}\n  avant : ${a}\n  après : ${b}`)
  }
  for (const [k, v] of Object.entries(setIfMissing)) if (before[k] == null) console.log(`- ${k} (vide) → ${JSON.stringify(v)}`)
  if (apply) { await client.patch(id).setIfMissing(setIfMissing).set(set).commit(); console.log('✔ écrit') }
}
if (!apply) console.log('\nAperçu seulement. Relancer avec --apply pour écrire.')
