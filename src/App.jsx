import { useState, useEffect } from 'react'
import { MapPin, Zap, Wind, AlertTriangle, Camera, Map } from 'lucide-react'
import './index.css'
import LightPillar from './LightPillar'

function App() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState({})

  useEffect(() => {
    let interval
    const tick = () => {
      // briefly show loading (optional)
      setLoading({
        traffic: true,
        power: true,
        aqi: true,
        emergency: true,
        cctv: true,
        gis: true
      })

      // simulate a small network latency before applying values
      setTimeout(() => {
        setData({
          traffic: `${(Math.random() * 3 + 1).toFixed(1)}% ${['↑','↓'][Math.floor(Math.random()*2)]}`,
          power: `${(98.5 + Math.random()*1.5).toFixed(1)}% 🟢`,
          aqi: ['Good','Fair','Moderate'][Math.floor(Math.random()*3)],
          emergency: `${5 + Math.floor(Math.random()*12)} Active`,
          cctv: `${240 + Math.floor(Math.random()*60)}/300 ${['🟢','🟡','🔴'][Math.floor(Math.random()*3)]}`,
          gis: `${Math.floor(97.5 + Math.random()*2.5)}%`
        })
        // clear loading flags
        setLoading({})
      }, 250 + Math.random() * 300)
    }

    tick()
    interval = setInterval(tick, 3500) // Updates every 3.5s

    return () => clearInterval(interval)
  }, [])

  const cards = [
    { title: "Live Traffic Heatmap", id: 'traffic', Icon: MapPin },
    { title: "Power Grid Status", id: 'power', Icon: Zap },
    { title: "AQI Pollution Gauges", id: 'aqi', Icon: Wind },
    { title: "Emergency Incident Map", id: 'emergency', Icon: AlertTriangle },
    { title: "CCTV Camera Feeds", id: 'cctv', Icon: Camera },
    { title: "City-wide GIS Overlay", id: 'gis', Icon: Map }
  ]

  // semantic/icon colours
  const iconColorMap = {
    traffic: '#06B6D4',    // cyan
    power: '#F59E0B',      // amber/yellow for power
    aqi: '#10B981',        // green for AQI (good)
    emergency: '#EF4444',  // red for danger
    cctv: '#EF4444',       // red for alert
    gis: '#60A5FA'         // blue for GIS
  }

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 p-8 font-sans overflow-hidden antialiased cursor-auto text-white">
      {/* Light pillar background (does not affect layout) */}
      <div className="absolute inset-x-0 top-0 h-[600px] -z-10 pointer-events-none">
        <LightPillar
          className="absolute inset-0"
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>

      <div className="max-w-7xl mx-auto h-full relative z-10 flex flex-col pt-20">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 text-center">
          Smart City Command Center
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-4">
          {cards.map(({ title, id, Icon }) => {
            const color = iconColorMap[id] || '#ffffff'
            return (
              <div
                key={id}
                className="bg-gradient-to-br from-slate-900/85 to-slate-800/85 backdrop-blur-xl border border-slate-700/40 p-6 rounded-2xl shadow-2xl hover:shadow-sky-500/25 hover:-translate-y-1 hover:border-sky-500/50 transition-all duration-300 min-h-[200px] flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, transparent)`,
                      boxShadow: `0 8px 20px ${color}22, inset 0 1px 0 ${color}12`
                    }}
                  >
                    {Icon && (
                      <Icon
                        className="w-6 h-6"
                        style={{
                          color,
                          filter: `drop-shadow(0 6px 12px ${color}55)`
                        }}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>

                <div className="mt-auto">
                  {loading[id] ? (
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-6 h-6 border-2 border-slate-600 border-t-sky-400 rounded-full animate-spin" />
                      Loading...
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-white">
                      {data[id] || 'Loading...'}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
