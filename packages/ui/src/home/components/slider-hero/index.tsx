'use client'

import type React from 'react';
import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    id: 1,
    title: "Transform Your Digital Experience",
    description: "Create stunning websites with our innovative platform",
    image: {
      mobile: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=750",
      tablet: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1024",
      desktop: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
    },
  },
  {
    id: 2,
    title: "Build Without Limits",
    description: "Powerful tools for modern web development",
    image: {
      mobile: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=750",
      tablet: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1024",
      desktop: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1920",
    },
  },
  {
    id: 3,
    title: "Design for the Future",
    description: "Stay ahead with cutting-edge technology",
    image: {
      mobile: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=750",
      tablet: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1024",
      desktop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920",
    },
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const dragStartRef = useRef<number>(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [isDragging]);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    setStartPos(clientX);
    dragStartRef.current = clientX;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const currentPosition = clientX;
    const diff = currentPosition - dragStartRef.current;
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    
    setCurrentTranslate(prevTranslate + (diff / sliderWidth) * 100);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 20; // percentage of slide width needed to trigger change
    const diff = currentTranslate - prevTranslate;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Moving right
        if (currentSlide === 0) {
          // If at first slide, go to last
          setCurrentSlide(slides.length - 1);
        } else {
          setCurrentSlide(currentSlide - 1);
        }
      } else {
        // Moving left
        if (currentSlide === slides.length - 1) {
          // If at last slide, go to first
          setCurrentSlide(0);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }
    }
    
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  const getSlideStyle = (index: number) => {
    let translateX = (index - currentSlide) * 100;
    
    // Adjust position for circular navigation
    if (currentSlide === 0 && index === slides.length - 1) {
      translateX = -100; // Position last slide to the left of first slide
    } else if (currentSlide === slides.length - 1 && index === 0) {
      translateX = 100; // Position first slide to the right of last slide
    }

    return {
      transform: `translateX(${translateX + (isDragging ? currentTranslate : 0)}%) scale(${isDragging ? 0.98 : 1})`,
      opacity: isDragging ? 0.9 : 1,
      zIndex: index === currentSlide ? 10 : 0,
    };
  };

  return (
    <div 
      ref={sliderRef}
      className="relative h-[50dvh] md:h-[75dvh] lg:h-[100dvh] w-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-all duration-700 ease-out transform will-change-transform"
          style={getSlideStyle(index)}
        >
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={slide.image.desktop}
              />
              <source
                media="(min-width: 768px)"
                srcSet={slide.image.tablet}
              />
              <img
                src={slide.image.mobile}
                alt={slide.title}
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                style={{
                  filter: isDragging ? 'blur(2px)' : 'none',
                }}
                loading="lazy"
              />
            </picture>
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
              style={{
                backdropFilter: 'blur(2px)',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div 
              className="text-center text-white max-w-4xl mx-auto"
              style={{
                transform: `translateY(${isDragging ? '10px' : '0'}) scale(${isDragging ? 0.98 : 1})`,
                transition: 'all 0.5s ease-out',
              }}
            >
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {slide.title}
              </h2>
              <p 
                className="text-lg md:text-xl lg:text-2xl mb-8 transition-all duration-700 opacity-90"
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {slide.description}
              </p>
              <button 
                type='button'
                className="bg-white text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-opacity-90 hover:shadow-lg"
                style={{
                  backdropFilter: 'blur(4px)',
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <div
            key={`${index + 1}_slider`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-white scale-125 w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            style={{
              boxShadow: index === currentSlide ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
            }}
            aria-label={`Slide ${index + 1} of ${slides.length}`}
            role="status"
          />
        ))}
      </div>
    </div>
  );
};
