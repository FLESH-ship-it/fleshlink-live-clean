'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AppWindow from '@/components/desktop/AppWindow'

interface OpenApp {
  id: string
  title: string
  content: React.ReactNode
}

export default function Desktop() {
  const router = useRouter()
  const [openApps, setOpenApps] = useState<OpenApp[]>([])
  const [focusedAppId, setFocusedAppId] = useState<string | null>(null)

  const openApp = (app: OpenApp) => {
    if (!openApps.find(a => a.id === app.id)) {
      setOpenApps([...openApps, app])
      setFocusedAppId(app.id)
    } else {
      setFocusedAppId(app.id)
    }
  }

  const closeApp = (id: string) => {
    setOpenApps(openApps.filter(app => app.id !== id))
    if (focusedAppId === id) {
      setFocusedAppId(openApps.length > 1 ? openApps[openApps.length - 2].id : null)
    }
  }

  const handleKaosLaunch = () => {
    router.push('/play/kaos')
  }

  return (
    <main className="relative h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Desktop Area */}
      <div className="absolute inset-0">
        {openApps.map((app, index) => (
          <AppWindow
            key={app.id}
            id={app.id}
            title={app.title}
            initialX={120 + index * 40}
            initialY={80 + index * 40}
            onClose={() => closeApp(app.id)}
            onFocus={() => setFocusedAppId(app.id)}
            zIndex={focusedAppId === app.id ? 1000 : 900 + index}
          >
            {app.content}
          </AppWindow>
        ))}
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black bg-opacity-80 backdrop-blur-md border-t border-gray-700 flex items-center px-4 gap-4">
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all"
            onClick={() => openApp({
              id: 'welcome',
              title: 'Welcome',
              content: (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Welcome to FLESHLINK</h2>
                  <p className="mb-4">Desktop OS running in your browser.</p>
                  <p className="text-gray-400">Click buttons in the taskbar to open apps.</p>
                </div>
              )
            })}
          >
            Start
          </button>
          
          <button
            className="px-4 py-2 bg-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all"
            onClick={handleKaosLaunch}
          >
            KAOS
          </button>

          <button
            className="px-4 py-2 bg-green-600 rounded-lg font-semibold text-sm hover:bg-green-700 transition-all"
            onClick={() => openApp({
              id: 'files',
              title: 'Files',
              content: (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">File Manager</h2>
                  <p className="text-gray-400">File system browser coming soon...</p>
                </div>
              )
            })}
          >
            Files
          </button>
        </div>

        <div className="flex-1" />

        {/* Open Apps */}
        <div className="flex gap-2">
          {openApps.map(app => (
            <button
              key={app.id}
              className={`px-3 py-1 rounded text-sm transition-all ${
                focusedAppId === app.id 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setFocusedAppId(app.id)}
            >
              {app.title}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
