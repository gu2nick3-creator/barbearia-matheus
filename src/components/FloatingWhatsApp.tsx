import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BARBERSHOP_DATA } from '../data/barbershopData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show polite tooltip after 3 seconds
    const timer = setTimeout(() => {
      if (!dismissed) {
        setShowTooltip(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const whatsappUrl = `https://wa.me/${BARBERSHOP_DATA.phoneRaw}?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20na%20Barbearia%20Matheus%20lucian%20no%20Sudoeste.`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Speech bubble */}
      {showTooltip && !dismissed && (
        <div className="mb-3 max-w-xs bg-neutral-900 border border-neutral-700 text-white p-3.5 rounded-2xl shadow-2xl relative animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
              setDismissed(true);
            }}
            className="absolute top-2 right-2 text-neutral-400 hover:text-white p-1 rounded-full"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-start gap-2.5 pr-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 animate-pulse" />
            <div>
              <p className="text-xs font-bold text-white">Barbearia Matheus lucian</p>
              <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">
                Olá! Precisa agendar ou tirar dúvidas? Chame a gente no WhatsApp: <span className="font-semibold text-emerald-400">(61) 99292-0911</span>.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 block text-center py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Iniciar Conversa
          </a>

          {/* Little arrow down */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-neutral-900 border-r border-b border-neutral-700 transform rotate-45" />
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp Barbearia Matheus lucian"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 group-hover:animate-ping" />
        
        <MessageCircle className="w-7 h-7 relative z-10 fill-white text-emerald-500" />
      </a>
    </div>
  );
};
