"use client"

import React from "react"
import { UserButton, useUser } from "@clerk/nextjs"
import { Waves, MapPin, Camera, Users, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import MapComponent from "../components/MapComponent"
import SearchSection from "../components/SearchSection"
import Logo from "../../logo.svg"

export default function DashboardPage() {
  const { user } = useUser()
  const [ userLocation, setUserLocation ] = React.useState({lat: -22.9292, lng: -42.5099})

  React.useEffect(() => { 
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        console.log("User location:", position.coords.latitude, position.coords.longitude)
      }, (error) => {
        console.error("Error getting user location:", error)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-teal-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full mr-3">
                <Logo className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Socó</h1>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 md:grid-cols-3 gap-5 min-h-full grid grid-cols-1">
        <SearchSection />
        <div className="lg:col-span-2 md:col-span-2">
        <MapComponent
          className="rounded-lg shadow-lg"
          lat={userLocation.lat}
          lng={userLocation.lng}
          zoom={17}
        />
        </div>
      </main>
    </div>
  )
}