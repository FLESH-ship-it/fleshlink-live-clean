'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function KaosRunContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const seed = searchParams.get('seed')
  const selectedModule = searchParams.get('module')

  const [health, setHealth] = useState(100)
  const [energy, setEnergy] = useState(100)
  const [score, setScore] = useState(0)
  const [gameTime, setGameTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className="h-screen w-screen bg-black text-white overflow-hidden relative">
      {/* HUD Shell */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top HUD Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-4 pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/play/kaos')}
                className="px-3 py-1 bg-red-900 bg-opacity-50 hover:bg-opacity-70 rounded text-sm border border-red-700"
              >
                ← Exit
              </button>
              <div className="text-sm">
                <span className="text-gray-400">Scenario:</span>{' '}
                <span className="text-purple-400 font-mono">{seed || 'N/A'}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Module:</span>{' '}
                <span className="text-blue-400 font-bold">{selectedModule?.toUpperCase() || 'N/A'}</span>
              </div>
            </div>
            <div className="text-xl font-mono">{formatTime(gameTime)}</div>
          </div>
        </div>

        {/* Right HUD Panel */}
        <div className="absolute top-20 right-4 bg-black bg-opacity-80 backdrop-blur-md border border-gray-800 rounded-lg p-4 pointer-events-auto w-64">
          <h3 className="text-lg font-bold mb-4 text-purple-400">Status</h3>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Health</span>
              <span>{health}%</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all"
                style={{ width: `${health}%` }}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Energy</span>
              <span>{energy}%</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
                style={{ width: `${energy}%` }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <div className="text-sm text-gray-400">Score</div>
            <div className="text-3xl font-bold text-yellow-400">{score}</div>
          </div>
        </div>

        {/* Bottom HUD Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded border border-gray-700">
                Inventory
              </button>
              <button className="px-4 py-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded border border-gray-700">
                Map
              </button>
              <button className="px-4 py-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded border border-gray-700">
                Objectives
              </button>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setScore(score + 10)}
                className="px-4 py-2 bg-green-900 bg-opacity-50 hover:bg-opacity-70 rounded border border-green-700"
              >
                +Score
              </button>
              <button 
                onClick={() => setHealth(Math.max(0, health - 10))}
                className="px-4 py-2 bg-red-900 bg-opacity-50 hover:bg-opacity-70 rounded border border-red-700"
              >
                -Health
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content Area */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            KAOS RUN
          </h1>
          <p className="text-2xl text-gray-400 mb-8">Game simulation active</p>
          <div className="text-gray-500">
            <p>This is the main game area.</p>
            <p className="mt-2">Use the HUD controls to interact with the game.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function KaosRun() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
        <p>Loading KAOS...</p>
      </div>
    }>
      <KaosRunContent />
    </Suspense>
  )
}
