'use client'

import { useEffect, useRef } from 'react'

export default function HeroAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    svg.setAttribute('viewBox', '0 0 696 316')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice')
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0.35'

    const pathEls: Array<{ el: SVGPathElement; i: number }> = []
    ;[1, -1].forEach((position) => {
      for (let i = 0; i < 36; i++) {
        const x0 = 380 - i * 5 * position
        const y0 = 189 + i * 6
        const x1 = 312 - i * 5 * position
        const y2 = 152 - i * 5 * position
        const y3 = 343 - i * 6
        const x3 = 616 - i * 5 * position
        const y4 = 470 - i * 6
        const x4 = 684 - i * 5 * position
        const y5 = 875 - i * 6
        const d = `M-${x0} -${y0}C-${x0} -${y0} -${x1} ${216 - i * 6} ${y2} ${y3}C${x3} ${y4} ${x4} ${y5} ${x4} ${y5}`
        const p = document.createElementNS(ns, 'path')
        p.setAttribute('d', d)
        p.setAttribute('stroke', 'rgba(74,159,191,1)')
        p.setAttribute('stroke-width', String(0.5 + i * 0.03))
        p.setAttribute('stroke-opacity', String(Math.min(0.04 + i * 0.009, 0.32)))
        p.setAttribute('fill', 'none')
        svg.appendChild(p)
        pathEls.push({ el: p, i })
      }
    })

    container.appendChild(svg)

    requestAnimationFrame(() => {
      pathEls.forEach(({ el: p, i }) => {
        const len = p.getTotalLength()
        if (!len) return
        const dashLen = len * (0.3 + i * 0.02)
        const duration = (20 + Math.random() * 10) * 1000
        const delay = -(Math.random() * duration)
        const baseOpacity = Math.min(0.04 + i * 0.009, 0.32)
        p.style.strokeDasharray = `${dashLen} ${len}`
        p.animate(
          [
            { strokeDashoffset: '0', strokeOpacity: String(baseOpacity * 0.5) },
            { strokeDashoffset: String(-len * 0.4), strokeOpacity: String(baseOpacity), offset: 0.4 },
            { strokeDashoffset: String(-len * 0.85), strokeOpacity: String(baseOpacity * 0.3) },
          ],
          { duration, delay, iterations: Infinity, easing: 'linear' }
        )
      })
    })

    return () => { container.innerHTML = '' }
  }, [])

  return (
    <div
      ref={ref}
      className="hero-paths"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 40%, black 80%)',
        maskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 40%, black 80%)',
      }}
    />
  )
}
