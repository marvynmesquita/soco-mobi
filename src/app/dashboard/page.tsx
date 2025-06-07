"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Waves, MapPin, Camera, Users } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName || "Explorer"}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to discover new coastal destinations and create amazing memories?
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-teal-100 dark:border-gray-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Explore Destinations</CardTitle>
              <CardDescription>Discover hidden coastal gems and popular beach destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Start Exploring</Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-teal-100 dark:border-gray-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Photo Gallery</CardTitle>
              <CardDescription>Share your coastal adventures and stunning photography</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                View Gallery
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-teal-100 dark:border-gray-700">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Travel Community</CardTitle>
              <CardDescription>Connect with fellow travelers and share experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-50">
                Join Community
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-teal-100 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
            <CardDescription>Your latest coastal discoveries and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  Welcome to Coastal Explorer! Start by exploring destinations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
