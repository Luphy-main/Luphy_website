// Import Sanity : membres de l'équipe, repris tels quels de /equipe, /expertise-finance et du JSON-LD founder.
// Usage : node scripts/import-equipe.mjs          (aperçu, n'écrit rien)
//         node scripts/import-equipe.mjs --apply  (envoie les photos et crée ou remplace les documents)
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

const key = () => crypto.randomBytes(6).toString('hex')
const paragraphes = textes => textes.map(t => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: key(), text: t, marks: [] }],
}))

const MEMBRES = [
  {
    _id: 'membre-titouan-galpin',
    nom: 'Titouan Galpin',
    photoFichier: 'public/brand-assets/team/titouan-galpin-2026.jpg',
    photoAlt: 'Titouan Galpin, co-fondateur de Luphy',
    fonction: 'COO · Pôle CRM & commercial',
    courteDescription: "Expérience en investissement, relations investisseurs, finance et accompagnement de sociétés financières. Pôle performance commerciale : CRM, outbound, structuration de la relation investisseur.",
    bio: [
      "Titouan pilote le pôle performance commerciale : CRM, outbound et structuration de la relation investisseur.",
      "Ancien VC, il a ensuite été Head of Investor Relations chez Caption. Il connaît de l'intérieur la façon dont un fonds suit ses deals, ses LP et son réseau.",
      "Formé en finance et en droit.",
    ],
    domaines: ['CRM Affinity, DealCloud, HubSpot, Pipedrive', 'Prospection outbound', 'Pipeline et performance commerciale', 'Formation équipes commerciales'],
    pole: 'commercial',
    linkedin: 'https://www.linkedin.com/in/titouan-galpin/',
    ordre: 1,
  },
  {
    _id: 'membre-tristan-camilli',
    nom: 'Tristan Camilli',
    photoFichier: 'public/brand-assets/team/tristan-camilli.jpg',
    photoAlt: 'Tristan Camilli, co-fondateur de Luphy',
    fonction: 'CEO · Pôle IA & opérations',
    courteDescription: "Opérations, digitalisation, CRM, automatisation et IA. Ancien Head of Operations chez Caption.market. INSA Toulouse, ESCP. Pôle performance opérationnelle : automatisation, IA, formation.",
    bio: [
      "Tristan pilote le pôle performance opérationnelle : automatisation, IA et formation des équipes.",
      "Avant Luphy, il était Head of Operations chez Caption (PSI / fonds).",
      "Formé à l'INSA Toulouse et à l'ESCP.",
    ],
    domaines: ['Automatisation (n8n, Make)', 'IA et agents Claude', 'Acculturation IA dirigeants et équipes', 'Coaching IA individuel'],
    pole: 'operationnel',
    linkedin: 'https://www.linkedin.com/in/tristan-camilli/',
    ordre: 2,
  },
]

const apply = process.argv.includes('--apply')
for (const m of MEMBRES) {
  if (m.courteDescription.length > 300) { console.error(`${m.nom} : courte description > 300 caractères`); process.exit(1) }
  console.log(`\n${m._id} : ${m.nom} (${m.fonction}), ordre ${m.ordre}, photo ${m.photoFichier}`)
  if (!apply) continue
  const asset = await client.assets.upload('image', fs.createReadStream(m.photoFichier), { filename: m.photoFichier.split('/').pop() })
  await client.createOrReplace({
    _id: m._id,
    _type: 'membreEquipe',
    nom: m.nom,
    photo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt: m.photoAlt },
    fonction: m.fonction,
    courteDescription: m.courteDescription,
    bioLongue: paragraphes(m.bio),
    domaines: m.domaines,
    pole: m.pole,
    linkedin: m.linkedin,
    fondateur: true,
    ordre: m.ordre,
    visible: true,
  })
  console.log(`✔ écrit (photo ${asset._id})`)
}
if (!apply) console.log('\nAperçu seulement. Relancer avec --apply pour écrire.')
