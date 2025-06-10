"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Waves, MapPin, Camera, Users } from "lucide-react"
import { Button } from "../components/ui/button"
import MapComponent from "../components/MapComponent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="max-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-teal-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 mr-3">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Coastal Explorer</h1>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MapComponent />
      </main>
    </div>
  )
}
