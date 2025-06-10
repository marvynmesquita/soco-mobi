"use client"

import { SignIn } from "@clerk/nextjs"
import Image from "next/image"
import { ArrowLeft, Waves } from "lucide-react"
import { Button } from "../../components/ui/button"
import Link from "next/link"

import Logo from "../../../logo.svg"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/images/onboarding/slide3.png" alt="Coastal sunset" fill className="object-cover" priority />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-teal-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md justify-center">
            {/* Brand Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16">
                <Logo className="w-16 h-16"/>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Olá, de novo!</h1>
              <p className="text-teal-100">Faça login para continuarmos</p>
            </div>

            {/* Clerk Sign In Component */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl min-w-fit">
              <SignIn
                redirectUrl="/dashboard"
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none",
                    headerTitle: "text-2xl font-bold text-gray-900 text-center mb-2",
                    headerSubtitle: "text-gray-600 text-center mb-6",
                    socialButtonsBlockButton:
                      "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors",
                    socialButtonsBlockButtonText: "font-medium",
                    dividerLine: "bg-gray-300",
                    dividerText: "text-gray-500 text-sm",
                    formFieldInput:
                      "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors",
                    formFieldLabel: "text-gray-700 font-medium mb-2",
                    formButtonPrimary:
                      "bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring focus:ring-teal-300",
                  },
                }}
              />
            </div>
        </div>
      </div>
      </div>
      </div>
  )
}
