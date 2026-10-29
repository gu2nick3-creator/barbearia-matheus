import React from 'react';
import { Star, MessageCircle, Quote } from 'lucide-react';
import { BARBERSHOP_DATA } from '../data/barbershopData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#171717] relative border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Depoimentos Reais</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] uppercase tracking-tight mb-4">
            A Opinião de Quem Frequenta
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            A satisfação dos nossos clientes no Sudoeste é o nosso maior padrão de qualidade.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BARBERSHOP_DATA.testimonials.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between relative shadow-lg"
            >
              <Quote className="w-8 h-8 text-neutral-800 absolute top-4 right-4" />
              
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#F5F5F5] uppercase">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {item.role}
                  </p>
                </div>
                <span className="text-[11px] text-neutral-500">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-xs text-neutral-400">
          <span className="flex text-amber-400 font-bold">★ 5.0</span>
          <span>• Barbearia de destaque no Setor Sudoeste em Brasília</span>
        </div>

      </div>
    </section>
  );
};
