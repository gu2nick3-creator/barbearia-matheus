import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { BARBERSHOP_DATA } from '../data/barbershopData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#171717] relative border-t border-b border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] uppercase tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Reunimos as principais perguntas dos nossos clientes sobre atendimento, barboterapia, 
            localização no Sudoeste e pagamentos.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {BARBERSHOP_DATA.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900 border-neutral-700 shadow-xl'
                    : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-[#F5F5F5] pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-300 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#F5F5F5] text-[#1A1A1A]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#F5F5F5] uppercase">
              Ficou com alguma outra dúvida?
            </h4>
            <p className="text-xs text-neutral-400">
              Estamos prontos para atender você com toda atenção pelo WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/${BARBERSHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20atendimento%20na%20Barbearia%20Matheus%20lucian.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F5F5] hover:bg-white transition-all shrink-0 cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
