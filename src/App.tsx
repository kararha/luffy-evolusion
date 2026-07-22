import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { 
    src: '/assets/gear 2.png', 
    ghostTitle: 'GEAR TWO',
    title: 'GEAR 2',
    subtitle: 'ACCELERATED BLOOD',
    desc: 'Gear 2 is the technique where Luffy dramatically increases his speed and power by pumping his blood at an accelerated rate. The intense circulation creates heat and releases steam from his body, allowing lightning-fast attacks that overwhelm opponents.',
    gradient: 'radial-gradient(circle at 50% 40%, #5B1320 0%, #3B0D16 45%, #120607 100%)',
    bgImage: 'url("/assets/gear2-bg.png")',
    overlay: 'rgba(0,0,0,0.45)',
    radialGlow: 'transparent',
    ghostOpacity: 0.06,
    ghostColor: 'rgba(255,255,255,0.06)',
    themeMode: 'dark'
  },
  { 
    src: '/assets/g4.png', 
    ghostTitle: 'GEAR FOUR',
    title: 'GEAR 4',
    subtitle: 'BOUNDMAN',
    desc: 'Gear 4 transforms Luffy into a heavily haki-coated fighter with incredible strength, elasticity, and mobility. Each punch carries devastating impact while maintaining surprising speed.',
    gradient: 'radial-gradient(circle at 50% 40%, #6E1730 0%, #4A1021 45%, #18060A 100%)',
    bgImage: 'url("/assets/gear4-bg.png")',
    overlay: 'rgba(0,0,0,0.35)',
    radialGlow: 'rgba(255,120,120,0.15)',
    ghostOpacity: 0.07,
    ghostColor: 'rgba(255,255,255,0.07)',
    themeMode: 'dark'
  },
  { 
    src: '/assets/g5.png', 
    ghostTitle: 'GEAR FIVE',
    title: 'GEAR 5',
    subtitle: 'AWAKENED FORM',
    desc: "Gear 5 is Luffy's awakened form, granting him complete freedom over his body and surroundings. Inspired by the legendary Sun God Nika, this transformation blends limitless imagination with overwhelming power, turning every battle into unpredictable chaos.",
    gradient: 'radial-gradient(circle at 50% 40%, #EEF4FF 0%, #DDE8FF 30%, #CBDFFF 60%, #BFD9FF 100%)',
    bgImage: 'url("/assets/gear5-bg.png")',
    overlay: 'rgba(255,255,255,0.08)',
    radialGlow: 'rgba(255,255,255,0.45)',
    ghostOpacity: 0.08,
    ghostColor: 'rgba(255,255,255,0.08)',
    themeMode: 'light'
  }
];

const GRAIN_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

const ParticleEffects = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Gear 2 Effects: Steam & Speed Streaks */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: activeIndex === 0 ? 1 : 0 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`streak-${i}`} className="streak" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${0.5 + Math.random()}s`, opacity: 0.1 }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`smoke-2-${i}`} className="smoke-curl" style={{ left: `${Math.random() * 100}%`, bottom: `${Math.random() * 50}%`, width: `${100 + Math.random() * 200}px`, height: `${100 + Math.random() * 200}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${4 + Math.random() * 4}s` }} />
        ))}
      </div>

      {/* Gear 4 Effects: Haki Sparks & Dark Smoke */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: activeIndex === 1 ? 1 : 0 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`spark-${i}`} className="particle bg-red-500" style={{ left: `${Math.random() * 100}%`, bottom: `${Math.random() * 100}%`, width: `${2 + Math.random() * 4}px`, height: `${2 + Math.random() * 4}px`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 3}s`, boxShadow: '0 0 8px #f00' }} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`smoke-4-${i}`} className="smoke-curl" style={{ left: `${Math.random() * 100}%`, bottom: `${Math.random() * 30}%`, width: `${150 + Math.random() * 250}px`, height: `${150 + Math.random() * 250}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${5 + Math.random() * 5}s`, background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)' }} />
        ))}
      </div>

      {/* Gear 5 Effects: Clouds, Lightning, Light Particles */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: activeIndex === 2 ? 1 : 0 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`cloud-${i}`} className="absolute bg-white/20 blur-3xl rounded-full" style={{ left: `${Math.random() * 100 - 20}%`, top: `${Math.random() * 100 - 20}%`, width: `${300 + Math.random() * 400}px`, height: `${200 + Math.random() * 200}px`, animation: `float-clouds ${10 + Math.random() * 10}s ease-in-out infinite alternate` }} />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={`light-${i}`} className="particle bg-white" style={{ left: `${Math.random() * 100}%`, bottom: `${Math.random() * 100}%`, width: `${3 + Math.random() * 5}px`, height: `${3 + Math.random() * 5}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`, boxShadow: '0 0 10px #fff' }} />
        ))}
        <div className="absolute inset-0 bg-yellow-100/10 mix-blend-overlay" style={{ animation: 'lightning 7s infinite' }} />
      </div>
    </div>
  );
};

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
          filter: 'drop-shadow(0 0 8px rgba(102,22,45,0.6)) drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(102,22,45,0.3))',
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
    <div className="relative w-full h-screen overflow-hidden font-sans bg-black">
      {/* Background Gradients */}
      {IMAGES.map((img, idx) => (
        <div
          key={`bg-grad-${idx}`}
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: activeIndex === idx ? 1 : 0,
            background: img.gradient
          }}
        />
      ))}

      {/* Background Images */}
      {IMAGES.map((img, idx) => (
        <div
          key={`bg-img-${idx}`}
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: activeIndex === idx ? 0.35 : 0,
            backgroundImage: img.bgImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}

      {/* Overlays */}
      {IMAGES.map((img, idx) => (
        <div
          key={`bg-overlay-${idx}`}
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: activeIndex === idx ? 1 : 0,
            backgroundColor: img.overlay
          }}
        />
      ))}

      {/* Radial Glows */}
      {IMAGES.map((img, idx) => (
        <div
          key={`bg-glow-${idx}`}
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: activeIndex === idx ? 1 : 0,
            background: `radial-gradient(circle at 50% 50%, ${img.radialGlow} 0%, transparent 60%)`
          }}
        />
      ))}

      {/* Particle Effects */}
      <ParticleEffects activeIndex={activeIndex} />

      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[50] opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Brand Label */}
      <div 
        className="absolute top-6 left-6 sm:top-8 sm:left-10 z-[100] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-1000 opacity-90"
        style={{ color: IMAGES[activeIndex].themeMode === 'light' ? '#111' : '#fff' }}
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
            filter: 'blur(2px)',
            opacity: activeIndex === idx ? 1 : 0,
            transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
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
        className="absolute z-[100] max-w-[360px] transition-colors duration-1000"
        style={{
          left: 'clamp(24px, 6vw, 90px)',
          bottom: 'clamp(32px, 8vh, 90px)',
          color: IMAGES[activeIndex].themeMode === 'light' ? '#111' : '#fff'
        }}
      >
        <div key={activeIndex} className="animate-fade-slide-up">
          <div 
            className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest mb-4 sm:mb-6 uppercase transition-colors duration-1000"
            style={{
              backgroundColor: IMAGES[activeIndex].themeMode === 'light' ? '#111' : '#fff',
              color: IMAGES[activeIndex].themeMode === 'light' ? '#fff' : '#4A0F21'
            }}
          >
            ● {IMAGES[activeIndex].title} — {IMAGES[activeIndex].subtitle}
          </div>
          
          <p 
            className="font-semibold uppercase tracking-widest mb-1 sm:mb-2 text-[10px] sm:text-xs opacity-90"
          >
            LUFFY EVOLUTION
          </p>
          
          <h2
            className="font-display uppercase mb-3 sm:mb-4 leading-none"
            style={{ 
              fontSize: 'clamp(30px, 4vw, 56px)',
            }}
          >
            {IMAGES[activeIndex].title}
          </h2>
          
          <p 
            className="hidden sm:block opacity-90 mb-6 sm:mb-8"
            style={{ 
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
            className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${IMAGES[activeIndex].themeMode === 'light' ? 'border-[#111] hover:bg-black/10' : 'border-white hover:bg-white/10'}`}
            aria-label="Previous"
          >
            <ArrowLeft size={26} strokeWidth={2.25} />
          </button>
          <button
            onClick={() => navigate('next')}
            className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${IMAGES[activeIndex].themeMode === 'light' ? 'border-[#111] hover:bg-black/10' : 'border-white hover:bg-white/10'}`}
            aria-label="Next"
          >
            <ArrowRight size={26} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      {/* Bottom Right Link */}
      <a 
        href="#"
        className="absolute z-[100] flex items-center gap-3 opacity-95 hover:opacity-100 transition-all duration-1000 no-underline"
        style={{ 
          right: 'clamp(24px, 6vw, 90px)',
          bottom: 'clamp(32px, 8vh, 90px)',
          color: IMAGES[activeIndex].themeMode === 'light' ? '#111' : '#fff'
        }}
      >
        <span className="font-display text-[28px] sm:text-[48px] uppercase leading-none tracking-tight">
          EXPLORE GEAR
        </span>
        <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.25} />
      </a>

      {/* Footer Credit */}
      <div 
        className="absolute left-1/2 bottom-[18px] -translate-x-1/2 text-[12px] font-medium tracking-[0.08em] opacity-65 hover:opacity-100 transition-colors duration-1000 z-[100] whitespace-nowrap select-none"
        style={{ color: IMAGES[activeIndex].themeMode === 'light' ? 'rgba(17,17,17,0.75)' : 'rgba(255,255,255,0.75)' }}
      >
        Created with <span className="text-red-500">❤</span> by Karar Haider
      </div>
    </div>
  );
}

