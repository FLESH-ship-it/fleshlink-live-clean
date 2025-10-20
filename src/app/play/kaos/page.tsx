'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function KaosSetup() {
  const router = useRouter()
  const [scenarioSeed, setScenarioSeed] = useState('')
  const [selectedModule, setSelectedModule] = useState('')

  const modules = [
    { id: 'combat', name: 'Combat Module', description: 'Tactical combat scenarios' },
    { id: 'exploration', name: 'Exploration Module', description: 'Open world discovery' },
    { id: 'social', name: 'Social Module', description: 'Character interactions' },
    { id: 'stealth', name: 'Stealth Module', description: 'Covert operations' },
  ]

  const handleStart = () => {
    if (scenarioSeed && selectedModule) {
      router.push(`/play/kaos/run?seed=${scenarioSeed}&module=${selectedModule}`)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push('/desktop')}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
          >
            ← Back to Desktop
          </button>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            KAOS Setup
          </h1>
          <p className="text-gray-400 text-lg">Configure your scenario and select a module</p>
        </div>

        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-800 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Scenario Seed</h2>
          <input
            type="text"
            value={scenarioSeed}
            onChange={(e) => setScenarioSeed(e.target.value)}
            placeholder="Enter scenario seed..."
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <p className="text-sm text-gray-500 mt-2">
            A unique identifier for your scenario (e.g., &quot;alpha-7&quot;, &quot;mission-x&quot;)
          </p>
        </div>

        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-lg border border-gray-800 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Select Module</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedModule === module.id
                    ? 'border-purple-500 bg-purple-900 bg-opacity-30'
                    : 'border-gray-700 bg-black bg-opacity-30 hover:border-gray-600'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                <p className="text-gray-400">{module.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleStart}
            disabled={!scenarioSeed || !selectedModule}
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              scenarioSeed && selectedModule
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            Launch KAOS →
          </button>
        </div>
      </div>
    </main>
  )
}
