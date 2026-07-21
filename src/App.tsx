import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { 
    src: '/assets/gear 2.png', 
    bg: '#D94A38', 
    ghostTitle: 'GEAR SECOND',
    ghostColor: 'rgba(255,255,255,0.12)',
    title: 'GEAR 2',
    subtitle: 'ACCELERATED BLOOD',
    textColor: '#FFFFFF',
    desc: 'Gear 2 is the technique where Luffy dramatically increases his speed and power by pumping his blood at an accelerated rate. The intense circulation creates heat and releases steam from his body, allowing lightning-fast attacks that overwhelm opponents.'
  },
  { 
    src: '/assets/g4.png', 
    bg: '#4B0F1F', 
    ghostTitle: 'GEAR FOURTH',
    ghostColor: 'rgba(255,255,255,0.12)',
    title: 'GEAR 4',
    subtitle: 'BOUNDMAN',
    textColor: '#FFFFFF',
    desc: 'Gear 4 transforms Luffy into a heavily haki-coated fighter with incredible strength, elasticity, and mobility. Each punch carries devastating impact while maintaining surprising speed.'
  },
  { 
    src: '/assets/g5.png', 
    bg: '#EFEFEF', 
    ghostTitle: 'GEAR FIFTH',
    ghostColor: 'rgba(0,0,0,0.08)',
    title: 'GEAR 5',
    subtitle: 'AWAKENED FORM',
    textColor: '#111111',
    desc: "Gear 5 is Luffy's awakened form, granting him complete freedom over his body and surroundings. Inspired by the legendary Sun God Nika, this transformation blends limitless imagination with overwhelming power, turning every battle into unpredictable chaos."
  }
];

const GRAIN_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    IMAGES.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => {
      if (dir === 'next') return (prev + 1) % IMAGES.length;
      return (prev + IMAGES.length - 1) % IMAGES.length;
    });
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  }, [isAnimating]);

  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + IMAGES.length - 1) % IMAGES.length) return 'left';
    if (index === (activeIndex + 1) % IMAGES.length) return 'right';
    return 'back';
  };

  const getRoleStyle = (role: string) => {
    const baseTransition = 'all 650ms cubic-bezier(0.4, 0, 0.2, 1)';
    switch (role) {
      case 'center':
        return {
          left: '50%',
          bottom: '4%',
          height: isMobile ? '65%' : '92%',
          transform: 'translateX(-50%)',
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          transition: baseTransition,
        };
      case 'left':
        return {
          left: isMobile ? '15%' : '23%',
          bottom: isMobile ? '25%' : '12%',
          height: isMobile ? '15%' : '14%',
          transform: 'translateX(-50%)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          transition: baseTransition,
        };
      case 'right':
        return {
          left: isMobile ? '85%' : '77%',
          bottom: isMobile ? '25%' : '12%',
          height: isMobile ? '15%' : '14%',
          transform: 'translateX(-50%)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          transition: baseTransition,
        };
      case 'back':
        return {
          left: '50%',
          bottom: isMobile ? '25%' : '12%',
          height: isMobile ? '12%' : '12%',
          transform: 'translateX(-50%)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          transition: baseTransition,
        };
      default: return {};
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden font-sans"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[50] opacity-40"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Brand Label */}
      <div 
        className="absolute top-6 left-6 sm:top-8 sm:left-10 z-[100] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] opacity-90"
        style={{
          color: IMAGES[activeIndex].textColor,
          transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        ONE PIECE
      </div>

      {/* Giant Ghost Text */}
      {IMAGES.map((img, idx) => (
        <div 
          key={idx}
          className="absolute z-[2] pointer-events-none select-none uppercase whitespace-nowrap font-display"
          style={{
            left: '4%',
            top: '18%',
            width: '140%',
            fontSize: 'clamp(180px, 34vw, 420px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            color: img.ghostColor,
            opacity: activeIndex === idx ? 1 : 0,
            transition: 'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {img.ghostTitle}
        </div>
      ))}

      {/* Carousel Items */}
      <div className="absolute inset-0 z-[3]">
        {IMAGES.map((img, idx) => {
          const role = getRole(idx);
          const style = getRoleStyle(role);
          return (
            <div
              key={idx}
              className="absolute will-change-transform will-change-[filter] will-change-[opacity]"
              style={{
                aspectRatio: '0.6 / 1',
                ...style
              }}
            >
              <img
                src={img.src}
                alt={`Figurine ${idx + 1}`}
                className="w-full h-full object-contain object-bottom pointer-events-none"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Left Info & Navigation */}
      <div 
        className="absolute z-[100] max-w-[360px]"
        style={{
          left: 'clamp(24px, 6vw, 90px)',
          bottom: 'clamp(32px, 8vh, 90px)'
        }}
      >
        <div key={activeIndex} className="animate-fade-slide-up">
          <div 
            className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest mb-4 sm:mb-6 uppercase"
            style={{ 
              backgroundColor: IMAGES[activeIndex].textColor, 
              color: IMAGES[activeIndex].bg,
              transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1), color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            ● {IMAGES[activeIndex].title} — {IMAGES[activeIndex].subtitle}
          </div>
          
          <p 
            className="font-semibold uppercase tracking-widest mb-1 sm:mb-2 text-[10px] sm:text-xs opacity-90"
            style={{ color: IMAGES[activeIndex].textColor, transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            LUFFY EVOLUTION
          </p>
          
          <h2
            className="font-display uppercase mb-3 sm:mb-4 leading-none"
            style={{ 
              fontSize: 'clamp(30px, 4vw, 56px)',
              color: IMAGES[activeIndex].textColor,
              transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {IMAGES[activeIndex].title}
          </h2>
          
          <p 
            className="hidden sm:block opacity-90 mb-6 sm:mb-8"
            style={{ 
              color: IMAGES[activeIndex].textColor, 
              transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
              fontSize: '15px',
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: '320px'
            }}
          >
            {IMAGES[activeIndex].desc}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => navigate('prev')}
            className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${IMAGES[activeIndex].textColor === '#111111' ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            style={{ borderColor: IMAGES[activeIndex].textColor, color: IMAGES[activeIndex].textColor }}
            aria-label="Previous"
          >
            <ArrowLeft size={26} strokeWidth={2.25} />
          </button>
          <button
            onClick={() => navigate('next')}
            className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${IMAGES[activeIndex].textColor === '#111111' ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            style={{ borderColor: IMAGES[activeIndex].textColor, color: IMAGES[activeIndex].textColor }}
            aria-label="Next"
          >
            <ArrowRight size={26} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      {/* Bottom Right Link */}
      <a 
        href="#"
        className="absolute z-[100] flex items-center gap-3 opacity-95 hover:opacity-100 transition-opacity duration-200 no-underline"
        style={{ 
          right: 'clamp(24px, 6vw, 90px)',
          bottom: 'clamp(32px, 8vh, 90px)',
          color: IMAGES[activeIndex].textColor, 
          transition: 'color 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms' 
        }}
      >
        <span className="font-display text-[28px] sm:text-[48px] uppercase leading-none tracking-tight">
          EXPLORE GEAR
        </span>
        <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.25} />
      </a>

      {/* Footer Credit */}
      <div 
        className="absolute left-1/2 bottom-[18px] -translate-x-1/2 text-[12px] font-medium tracking-[0.08em] opacity-65 hover:opacity-100 transition-opacity duration-250 z-[100] whitespace-nowrap select-none"
        style={{
          color: IMAGES[activeIndex].textColor === '#111111' ? 'rgba(17,17,17,0.75)' : 'rgba(255,255,255,0.75)'
        }}
      >
        Created with <span className="text-red-500">❤</span> by Karar Haider
      </div>
    </div>
  );
}

