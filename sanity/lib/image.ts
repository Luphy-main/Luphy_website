import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client as Parameters<typeof createImageUrlBuilder>[0])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Dimensions d'origine lues dans la référence Sanity (image-<id>-<largeur>x<hauteur>-<format>)
export function imageDimensions(source: { asset?: { _ref?: string } } | null | undefined) {
  const match = source?.asset?._ref?.match(/-(\d+)x(\d+)-\w+$/)
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null
}
