import React from 'react';
import { Calendar, Phone, MapPin, Award, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { BARBERSHOP_DATA } from '../data/barbershopData';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  // Check if currently open in Brasília (DF) time
  const isCurrentlyOpen = () => {
    try {
      const now = new Date();
      // Brasilia is UTC-3
      const brTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
      const day = brTime.getDay(); // 0 = Sun, 6 = Sat
      const hours = brTime.getHours();

      if (day === 0) return false; // Sunday
      if (day === 6) return hours >= 8 && hours < 19; // Saturday 8:30 - 19:00
      return hours >= 9 && hours < 20; // Mon-Fri 09:00 - 20:00
    } catch {
      return true;
    }
  };

  const openNow = isCurrentlyOpen();

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with layered gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={BARBERSHOP_DATA.realPhotos[0].url}
          alt="Barbearia Matheus lucian no Sudoeste Brasília"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        {/* Deep dark gradient overlays using #1A1A1A */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/85 to-[#1A1A1A]/75" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Location & Status Top Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-xs sm:text-sm text-neutral-300 mb-6 backdrop-blur-md shadow-lg">
          <span className="flex h-2 w-2 relative">
            {openNow && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                openNow ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </span>
          <span className="font-medium">
            {openNow ? 'Aberto agora' : 'Consulte disponibilidade'}
          </span>
          <span className="text-neutral-500">•</span>
          <span className="flex items-center gap-1 text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            Sudoeste, Brasília - DF
          </span>
        </div>

        {/* Brand Name */}
        <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-3">
          Barbearia Tradicional & Moderna
        </p>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F5] uppercase leading-[1.08] max-w-4xl">
          Barbearia <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
            Matheus lucian
          </span>
        </h1>

        {/* Slogan */}
        <div className="mt-4 sm:mt-6 mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-8 sm:w-16 bg-neutral-600" />
          <p className="text-lg sm:text-2xl md:text-3xl italic font-serif text-neutral-200 tracking-wide">
            "{BARBERSHOP_DATA.slogan}"
          </p>
          <div className="h-px w-8 sm:w-16 bg-neutral-600" />
        </div>

        {/* Subtitle / Description */}
        <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Experiência premium de cuidados masculinos no Setor Sudoeste. Cortes visagistas de precisão, 
          barboterapia com toalha quente e um ambiente exclusivo feito para você relaxar.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              onBookClick();
              const el = document.getElementById('agendamento');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F5F5] hover:bg-white hover:scale-[1.02] active:scale-98 transition-all shadow-xl shadow-white/5 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-neutral-900" />
            <span>Agendar Meu Horário</span>
          </button>

          <a
            href={BARBERSHOP_DATA.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 hover:text-white transition-all shadow-lg"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Features badges bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
            <CheckCircle2 className="w-5 h-5 text-neutral-300 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#F5F5F5] uppercase">Pontualidade</p>
              <p className="text-[11px] text-neutral-400">Sem esperas indesejadas</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
            <Sparkles className="w-5 h-5 text-neutral-300 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#F5F5F5] uppercase">Barboterapia</p>
              <p className="text-[11px] text-neutral-400">Toalha quente & óleos</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
            <Award className="w-5 h-5 text-neutral-300 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#F5F5F5] uppercase">Precisão & Estilo</p>
              <p className="text-[11px] text-neutral-400">Visagismo e acabamento</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/60">
            <MapPin className="w-5 h-5 text-neutral-300 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#F5F5F5] uppercase">Sudoeste Brasília</p>
              <p className="text-[11px] text-neutral-400">CCSW 6 comércio local</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre"
          className="mt-10 inline-flex flex-col items-center text-neutral-500 hover:text-neutral-300 transition-colors group"
          aria-label="Rolar para a seção sobre"
        >
          <span className="text-[11px] uppercase tracking-widest mb-1">Conhecer Mais</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
