import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Scissors, MapPin } from 'lucide-react';
import { BARBERSHOP_DATA } from '../data/barbershopData';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Agendamento', href: '#agendamento' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Localização', href: '#localizacao' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1A1A1A]/95 backdrop-blur-md border-b border-neutral-800 shadow-xl py-3'
          : 'bg-gradient-to-b from-[#141414]/90 via-[#1A1A1A]/70 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#inicio');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[#F5F5F5] group-hover:border-amber-500/50 transition-colors">
              <Scissors className="w-5 h-5 text-[#F5F5F5] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-[#F5F5F5] uppercase">
                Matheus Lucian
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase -mt-1 font-medium">
                Barbearia • Sudoeste DF
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-neutral-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${BARBERSHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Barbearia%20Matheus%20lucian!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-200 border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 hover:border-neutral-500 transition-all"
              title="Falar no WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>(61) 99292-0911</span>
            </a>

            <button
              onClick={() => {
                onBookClick();
                handleNavClick('#agendamento');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F5F5] hover:bg-white hover:shadow-lg hover:shadow-white/10 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Horário</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                onBookClick();
                handleNavClick('#agendamento');
              }}
              className="sm:hidden px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F5F5] active:scale-95 transition-transform"
            >
              Agendar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1A1A] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 rounded-md text-base font-medium text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <a
              href={`https://wa.me/${BARBERSHOP_DATA.phoneRaw}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Barbearia%20Matheus%20lucian!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-700/80 hover:bg-emerald-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: (61) 99292-0911</span>
            </a>

            <button
              onClick={() => {
                onBookClick();
                handleNavClick('#agendamento');
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F5F5] hover:bg-white transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Agora</span>
            </button>

            <div className="text-center text-xs text-neutral-400 pt-2 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>CCSW 6 - Sudoeste, Brasília DF</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
