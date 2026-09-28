'use client'
import { useState } from 'react'

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(n))
}

export default function MethodeCalculator() {
  const [vol, setVol] = useState(500)
  const [time, setTime] = useState(2)
  const [rate, setRate] = useState(60)
  const [pct, setPct] = useState(60)
  const [cost, setCost] = useState(15000)

  const currentCost = vol * time * rate
  const annualGain = currentCost * (pct / 100)
  const roi = cost > 0 && annualGain > 0 ? Math.round(((annualGain - cost) / cost) * 100) : 0
  const payback = annualGain > 0 ? Math.round((cost / annualGain) * 12) : 0

  return (
    <div className="calc-widget reveal">
      <p className="calc-note">Exemple illustratif — ajustez les paramètres selon votre situation.</p>
      <div className="calc-inputs">
        <div className="calc-field">
          <label>Volume annuel (dossiers, tâches…)</label>
          <input type="number" value={vol} min={1}
            onChange={e => setVol(Math.max(1, Number(e.target.value)))} />
        </div>
        <div className="calc-field">
          <label>Temps par unité (heures)</label>
          <input type="number" value={time} min={0.1} step={0.5}
            onChange={e => setTime(Math.max(0.1, Number(e.target.value)))} />
        </div>
        <div className="calc-field">
          <label>Coût horaire moyen (€)</label>
          <input type="number" value={rate} min={1}
            onChange={e => setRate(Math.max(1, Number(e.target.value)))} />
        </div>
        <div className="calc-field">
          <label>Part automatisable (%)</label>
          <input type="number" value={pct} min={1} max={100}
            onChange={e => setPct(Math.min(100, Math.max(1, Number(e.target.value))))} />
        </div>
        <div className="calc-field">
          <label>Coût estimé du projet (€)</label>
          <input type="number" value={cost} min={1000} step={1000}
            onChange={e => setCost(Math.max(1000, Number(e.target.value)))} />
        </div>
      </div>
      <div className="calc-result">
        <div className="calc-res-item">
          <div className="calc-res-val">{fmt(currentCost)} €</div>
          <div className="calc-res-lab">Coût actuel annuel</div>
        </div>
        <div className="calc-res-item">
          <div className="calc-res-val">{fmt(annualGain)} €</div>
          <div className="calc-res-lab">Gain potentiel annuel</div>
        </div>
        <div className="calc-res-item">
          <div className="calc-res-val">{roi > 0 ? `+${roi}` : roi} %</div>
          <div className="calc-res-lab">ROI estimé</div>
        </div>
        <div className="calc-res-item">
          <div className="calc-res-val">{payback} mois</div>
          <div className="calc-res-lab">Payback estimé</div>
        </div>
      </div>
      <p className="calc-disclaimer">
        Estimation illustrative. Les résultats réels dépendent du contexte, des équipes et des processus de votre organisation.
      </p>
    </div>
  )
}
