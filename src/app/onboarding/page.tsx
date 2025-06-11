"use client"

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import Image from "next/image";

import logo from "../../logo.svg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const onboardingSlides = [
    {
        id : 1,
        icon : logo,
        title : "Bem-vindo(a) ao Socó!",
        description : "Mova-se livremente por Saquarema",
        image : "/images/onboarding/slide1.png"
    },
    {
        id : 2,
        icon : logo,
        title : "Capture momentos incríveis",
        description : "Registre suas aventuras e compartilhe com amigos",
        image : "/images/onboarding/slide2.png"
    },
    {
        id : 3,
        icon : logo,
        title : "Pronto para embarcar?",
        description : "Embarque nessa jornada com a gente",
        image : "/images/onboarding/slide3.png"
    },
]

export default function OnboardingScreen() {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);
    
    const handleNext = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    }

    const handlePrev = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    }

    const handleSkip = () => {
        if (swiperInstance) {
            swiperInstance.slideTo(onboardingSlides.length - 1);
        }
    }

    const handleGetStarted = () => {
        // Implementar a lógica para redirecionar ou iniciar o aplicativo
      window.location.href = "/login"; 
    }

    return (
    <div className="max-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-0 relative z-10">
          <div className="flex space-x-2">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-teal-500" : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
          {currentSlide < onboardingSlides.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-white hover:text-gray-200 hover:bg-white/10 backdrop-blur-sm"
            >
              Pular
            </Button>
          )}
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            onSwiper={setSwiperInstance}
            className="h-[500px]"
          >
            {onboardingSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={slide.id === 1}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-white dark:to-gray-800" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-end text-center h-full p-8 pb-12">
                    {/* Icon */}
                    <div className="w-16 h-16 flex items-center justify-center mb-6">
                      <slide.icon className="w-16 h-16 text-white" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{slide.title}</h2>
                      <p className="text-gray-700 dark:text-gray-200 leading-relaxed px-2">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 bg-white dark:bg-gray-800">
          {currentSlide < onboardingSlides.length - 1 ? (
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Button>

              <Button onClick={handleNext} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white">
                Avançar
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-lg"
            >
              Embarque
            </Button>
          )}
        </div>

        {/* Swipe indicator */}
        <div className="text-center pb-4 bg-white dark:bg-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">Deslize para navegar</p>
        </div>
      </div>
    </div>
    )
}