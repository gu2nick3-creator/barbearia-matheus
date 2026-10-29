import React, { useState, useEffect, useCallback } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, ZoomIn, ZoomOut } from 'lucide-react';
import { BARBERSHOP_DATA, GalleryPhoto } from '../data/barbershopData';

export const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const photos = BARBERSHOP_DATA.realPhotos;

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsZoomed(false);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
    setIsZoomed(false);
  };

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setIsZoomed(false);
    setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  }, [selectedPhotoIndex, photos.length]);

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setIsZoomed(false);
    setSelectedPhotoIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  }, [selectedPhotoIndex, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handlePrev, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhotoIndex]);

  const currentPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <section id="galeria" className="py-20 sm:py-28 bg-[#171717] relative border-t border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Fotos Reais da Barbearia</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] uppercase tracking-tight mb-4">
            Conheça o Nosso Espaço
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Fotografias autênticas da Barbearia Matheus lucian no Sudoeste. Cada detalhe foi desenhado 
            para proporcionar máxima comodidade, higiene e conforto ao homem contemporâneo.
          </p>
        </div>

        {/* Responsive Photo Grid (All 4 Real Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-neutral-500 transition-all duration-300 shadow-xl"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Expand icon on hover */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1A1A1A]/80 border border-neutral-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Caption preview */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1 block">
                  Foto 0{index + 1} • Barbearia
                </span>
                <h3 className="font-display text-base font-bold text-[#F5F5F5] group-hover:text-white transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Small footer caption */}
        <div className="mt-8 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
          <span>* Fotos reais do nosso endereço na CCSW 6, Sudoeste - Brasília DF. Clique em qualquer foto para ampliar.</span>
        </div>

      </div>

      {/* Interactive Lightbox Modal */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Top Bar Controls */}
          <div
            className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 bg-neutral-900/90 border border-neutral-700 px-3 py-1 rounded-full">
                {selectedPhotoIndex + 1} / {photos.length}
              </span>
              <span className="text-sm font-semibold text-neutral-200 hidden sm:inline">
                {currentPhoto.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
                title={isZoomed ? 'Diminuir Zoom' : 'Aumentar Zoom'}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>

              <button
                onClick={handleCloseLightbox}
                className="p-2.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Image Container */}
          <div
            className="relative max-w-5xl max-h-[78vh] p-4 flex flex-col items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className={`max-w-full max-h-[68vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Bottom Caption */}
            <div className="mt-4 text-center max-w-xl">
              <h4 className="font-display text-lg font-bold text-[#F5F5F5]">
                {currentPhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {currentPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
