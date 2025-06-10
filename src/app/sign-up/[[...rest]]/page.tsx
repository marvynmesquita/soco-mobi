"use client"

import { SignUp } from "@clerk/nextjs"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import Link from "next/link"

import Logo from "../../../logo.svg"

export default function SignUpPage() {
  return (
    <div className="max-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/images/onboarding/slide2.png" alt="Beach community" fill className="object-cover" priority />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-teal-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Login
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Brand Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16">
                <Logo className="w-16 h-16"/>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Olá!</h1>
              <p className="text-teal-100">Cadastre-se para podermos continuar</p>
            </div>

            {/* Clerk Sign Up Component */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl flex-initial">
              <SignUp
                redirectUrl="/dashboard"
                signInUrl="/login"
              />
            </div>
        </div>
      </div>
      </div>
      </div>
  )
}
