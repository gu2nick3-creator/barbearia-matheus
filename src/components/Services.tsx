import React, { useState } from 'react';
import { Clock, Check, Scissors, Sparkles, ChevronRight } from 'lucide-react';
import { BARBERSHOP_DATA, ServiceItem } from '../data/barbershopData';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'cabelo', label: 'Cortes & Cabelo' },
    { id: 'barba', label: 'Barba & Cuidados' },
    { id: 'combo', label: 'Combos Especiais' },
  ];

  const filteredServices = activeCategory === 'todos'
    ? BARBERSHOP_DATA.services
    : BARBERSHOP_DATA.services.filter(s => s.category === activeCategory || (activeCategory === 'barba' && s.id === 'barba-express'));

  return (
    <section id="servicos" className="py-20 sm:py-28 bg-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>Tabela de Serviços</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] uppercase tracking-tight mb-4">
            Cuidados & Preços Transparentes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Procedimentos realizados com técnica apurada, produtos de alta performance e dedicação em cada detalhe. 
            Escolha seu serviço e reserve seu horário.
          </p>

          {/* Category filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#F5F5F5] text-[#1A1A1A] shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isCombo = service.category === 'combo';
            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-xl p-6 transition-all duration-300 relative ${
                  isCombo
                    ? 'bg-neutral-900 border-2 border-neutral-500 shadow-xl shadow-black/40'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6 bg-[#F5F5F5] text-[#1A1A1A] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Destaque</span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#F5F5F5]">
                      {service.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-xl sm:text-2xl font-black text-[#F5F5F5] tracking-tight">
                        {service.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{service.duration}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectService(service);
                      const el = document.getElementById('agendamento');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isCombo
                        ? 'bg-[#F5F5F5] text-[#1A1A1A] hover:bg-white'
                        : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white'
                    }`}
                  >
                    <span>Agendar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom note / combo callout */}
        <div className="mt-12 p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-300">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F5F5F5] uppercase">
                Precisa de atendimento especial ou evento corporativo?
              </h4>
              <p className="text-xs text-neutral-400">
                Fale diretamente conosco pelo WhatsApp para pacotes para noivos e grupos no Sudoeste.
              </p>
            </div>
          </div>

          <a
            href={BARBERSHOP_DATA.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-all shrink-0 border border-neutral-700"
          >
            Falar pelo WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
