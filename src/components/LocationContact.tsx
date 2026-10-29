import React, { useState } from 'react';
import { MapPin, Phone, Clock, Copy, Check, Navigation, ExternalLink } from 'lucide-react';
import { BARBERSHOP_DATA } from '../data/barbershopData';

export const LocationContact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BARBERSHOP_DATA.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const encodedAddress = encodeURIComponent(BARBERSHOP_DATA.address.full);
  const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const wazeRouteUrl = `https://waze.com/ul?q=${encodedAddress}`;

  return (
    <section id="localizacao" className="py-20 sm:py-28 bg-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Onde Estamos</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] uppercase tracking-tight mb-4">
            Localização & Contato
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Fácil acesso no Setor Sudoeste de Brasília com estacionamento em frente ao comércio local.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 text-white">
                  <MapPin className="w-5 h-5 text-neutral-200" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Endereço Completo
                  </span>
                  <h3 className="font-display text-base font-bold text-[#F5F5F5]">
                    {BARBERSHOP_DATA.address.street}
                  </h3>
                  <p className="text-sm text-neutral-300">
                    {BARBERSHOP_DATA.address.neighborhood}, {BARBERSHOP_DATA.address.city} - {BARBERSHOP_DATA.address.state}
                  </p>
                  <p className="text-xs text-neutral-400 font-mono">
                    CEP: {BARBERSHOP_DATA.address.cep}
                  </p>
                </div>
              </div>

              {/* Action buttons for navigation */}
              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copiar Endereço</span>
                    </>
                  )}
                </button>

                <a
                  href={googleMapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-400" />
                  <span>Como Chegar (Maps)</span>
                </a>

                <a
                  href={wazeRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Waze</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 text-white">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Telefone & WhatsApp
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#F5F5F5]">
                    {BARBERSHOP_DATA.phone}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Atendimento ágil para agendamentos e esclarecimento de dúvidas.
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex gap-2">
                <a
                  href={`tel:${BARBERSHOP_DATA.phoneRaw}`}
                  className="flex-1 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
                >
                  Ligar Agora
                </a>
                <a
                  href={`https://wa.me/${BARBERSHOP_DATA.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 text-white">
                  <Clock className="w-5 h-5 text-neutral-200" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Horários de Atendimento
                  </span>
                  <h3 className="font-display text-base font-bold text-[#F5F5F5]">
                    Funcionamento Semanal
                  </h3>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {BARBERSHOP_DATA.openingHours.map((item) => (
                  <div key={item.days} className="flex justify-between items-center py-1.5 border-b border-neutral-800/60 last:border-b-0">
                    <span className="text-neutral-400">{item.days}</span>
                    <span className="font-semibold text-neutral-200">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl min-h-[420px] relative flex flex-col">
            <div className="p-4 bg-neutral-900/95 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">CCSW 6 St. Sudoeste - Brasília DF</span>
              </div>
              <a
                href={BARBERSHOP_DATA.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <span>Ampliar Mapa</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Maps Embed with exact Sudoeste Brasília coordinates */}
            <iframe
              title="Localização Barbearia Matheus lucian"
              src="https://maps.google.com/maps?q=CCSW+6+Setor+Sudoeste+Brasilia+DF+70655-775&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] flex-1 border-0 filter grayscale contrast-125 invert-[0.88] brightness-90 hover:filter-none transition-all duration-500"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
