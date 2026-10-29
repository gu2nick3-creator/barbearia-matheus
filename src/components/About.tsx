import React from 'react';
import { Coffee, Flame, Clock, ShieldCheck, Scissors, ArrowRight } from 'lucide-react';
import { BARBERSHOP_DATA } from '../data/barbershopData';

interface AboutProps {
  onBookClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onBookClick }) => {
  return (
    <section id="sobre" className="py-20 sm:py-28 bg-[#171717] relative border-t border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual column with real barbershop photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative frame */}
              <div className="absolute -inset-2.5 rounded-2xl bg-neutral-800/40 border border-neutral-700/50 transform -rotate-1 hidden sm:block" />
              
              {/* Main Photo Card */}
              <div className="relative rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 shadow-2xl">
                <img
                  src={BARBERSHOP_DATA.realPhotos[1].url}
                  alt="Interior da Barbearia Matheus lucian no Sudoeste"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                
                {/* Floating badge inside photo */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#1A1A1A]/95 border border-neutral-700 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                      <Scissors className="w-5 h-5 text-[#F5F5F5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F5F5F5] uppercase">
                        {BARBERSHOP_DATA.name}
                      </h4>
                      <p className="text-xs text-neutral-400">
                        CCSW 6 • Sudoeste, Brasília DF
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller secondary photo snippet */}
              <div className="hidden md:block absolute -bottom-8 -right-8 w-48 h-48 rounded-xl overflow-hidden border-2 border-neutral-700 shadow-2xl z-20">
                <img
                  src={BARBERSHOP_DATA.realPhotos[2].url}
                  alt="Cadeira clássica e detalhes Barbearia Matheus lucian"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text & Values Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
              <span className="w-8 h-px bg-neutral-500" />
              <span>Nossa Filosofia</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] tracking-tight uppercase leading-tight mb-6">
              Mais do que um corte, <br />
              <span className="text-neutral-400 font-serif lowercase italic text-2xl sm:text-3xl md:text-4xl">
                um refúgio para o seu bem-estar
              </span>
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-6">
              A <strong>Barbearia Matheus lucian</strong> nasceu com um propósito claro: resgatar a elegância 
              do atendimento clássico em harmonia com as tendências contemporâneas de visagismo e estilo masculino.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
              Localizada estrategicamente no coração do <strong>Sudoeste em Brasília (CCSW 6)</strong>, nossa barbearia é 
              o ambiente perfeito para desacelerar do ritmo da capital. Aqui, cada detalhe é planejado para honrar 
              nosso lema: <em>"Onde o homem se sente bem"</em>.
            </p>

            {/* Differential grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center mb-3">
                  <Flame className="w-4 h-4 text-neutral-200" />
                </div>
                <h4 className="text-sm font-bold text-[#F5F5F5] uppercase mb-1">Toalha Quente Tradicional</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Tratamento térmico com vaporização e óleos que preparam a pele e proporcionam descanso profundo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center mb-3">
                  <Clock className="w-4 h-4 text-neutral-200" />
                </div>
                <h4 className="text-sm font-bold text-[#F5F5F5] uppercase mb-1">Pontualidade no Sudoeste</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Sistema de agendamento ágil para você encaixar o cuidado com a aparência na sua rotina sem atrasos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center mb-3">
                  <Coffee className="w-4 h-4 text-neutral-200" />
                </div>
                <h4 className="text-sm font-bold text-[#F5F5F5] uppercase mb-1">Café & Ambiente Climatizado</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Aprecie um café especial ou uma água gelada enquanto bate um papo descontraído em nossas cadeiras.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4 text-neutral-200" />
                </div>
                <h4 className="text-sm font-bold text-[#F5F5F5] uppercase mb-1">Higiene & Navalha Descartável</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Desinfecção contínua e lâminas de corte único descartadas na sua frente para máxima segurança.
                </p>
              </div>
            </div>

            {/* CTA inline */}
            <div>
              <button
                onClick={() => {
                  onBookClick();
                  const el = document.getElementById('agendamento');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#F5F5F5] hover:text-white group cursor-pointer"
              >
                <span>Escolher um serviço e agendar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
